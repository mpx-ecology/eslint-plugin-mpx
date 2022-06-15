/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 * @typedef {import('estree').Position} Position
 * @typedef {import('eslint').Rule.CodePath} CodePath
 * @typedef {import('eslint').Rule.CodePathSegment} CodePathSegment
 */
/**
 * @typedef {import('../../typings/eslint-plugin-mpx/util-types/utils').ComponentUnknownProp} ComponentUnknownProp
 */
/**
 * @typedef {object} ComponentArrayPropDetectName
 * @property {'array'} type
 * @property {Literal | TemplateLiteral} key
 * @property {string} propName
 * @property {null} value
 * @property {Expression | SpreadElement} node
 *
 * @typedef {object} ComponentArrayPropUnknownName
 * @property {'array'} type
 * @property {null} key
 * @property {null} propName
 * @property {null} value
 * @property {Expression | SpreadElement} node
 *
 * @typedef {ComponentArrayPropDetectName | ComponentArrayPropUnknownName} ComponentArrayProp
 *
 * @typedef {object} ComponentObjectPropDetectName
 * @property {'object'} type
 * @property {Expression} key
 * @property {string} propName
 * @property {Expression} value
 * @property {Property} node
 *
 * @typedef {object} ComponentObjectPropUnknownName
 * @property {'object'} type
 * @property {null} key
 * @property {null} propName
 * @property {Expression} value
 * @property {Property} node
 *
 * @typedef {ComponentObjectPropDetectName | ComponentObjectPropUnknownName} ComponentObjectProp
 */
/**
 * @typedef {object} ComponentArrayEmitDetectName
 * @property {'array'} type
 * @property {Literal | TemplateLiteral} key
 * @property {string} emitName
 * @property {null} value
 * @property {Expression | SpreadElement} node
 *
 * @typedef {object} ComponentArrayEmitUnknownName
 * @property {'array'} type
 * @property {null} key
 * @property {null} emitName
 * @property {null} value
 * @property {Expression | SpreadElement} node
 *
 * @typedef {ComponentArrayEmitDetectName | ComponentArrayEmitUnknownName} ComponentArrayEmit
 *
 * @typedef {object} ComponentObjectEmitDetectName
 * @property {'object'} type
 * @property {Expression} key
 * @property {string} emitName
 * @property {Expression} value
 * @property {Property} node
 *
 * @typedef {object} ComponentObjectEmitUnknownName
 * @property {'object'} type
 * @property {null} key
 * @property {null} emitName
 * @property {Expression} value
 * @property {Property} node
 *
 * @typedef {ComponentObjectEmitDetectName | ComponentObjectEmitUnknownName} ComponentObjectEmit
 */
/**
 * @typedef { {key: string | null, value: BlockStatement | null} } ComponentComputedProperty
 */
/**
 * @typedef { 'properties' | 'data' | 'computed' | 'watch' | 'methods' | 'setup' } GroupName
 * @typedef { { type: 'array',  name: string, groupName: GroupName, node: Literal | TemplateLiteral } } ComponentArrayPropertyData
 * @typedef { { type: 'object', name: string, groupName: GroupName, node: Identifier | Literal | TemplateLiteral, property: Property } } ComponentObjectPropertyData
 * @typedef { ComponentArrayPropertyData | ComponentObjectPropertyData } ComponentPropertyData
 */
/**
 * @typedef {import('../../typings/eslint-plugin-mpx/util-types/utils').VueObjectType} VueObjectType
 * @typedef {import('../../typings/eslint-plugin-mpx/util-types/utils').VueObjectData} VueObjectData
 * @typedef {import('../../typings/eslint-plugin-mpx/util-types/utils').VueVisitor} VueVisitor
 */

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const HTML_ELEMENT_NAMES = new Set(require('./html-elements.json'))
const MP_ELEMENT_NAMES = new Set(require('./mp-elements.json'))
const SVG_ELEMENT_NAMES = new Set(require('./svg-elements.json'))
const VOID_ELEMENT_NAMES = new Set(require('./void-elements.json'))
const path = require('path')
const mpxEslintParser = require('mpx-eslint-parser')
const { traverseNodes, getFallbackKeys, NS } = mpxEslintParser.AST
const { findVariable } = require('eslint-utils')

/**
 * @type { WeakMap<RuleContext, Token[]> }
 */
const componentComments = new WeakMap()

/** @type { Map<string, RuleModule> | null } */
let ruleMap = null
/**
 * Get the core rule implementation from the rule name
 * @param {string} name
 * @returns {RuleModule | null}
 */
function getCoreRule(name) {
  const map = ruleMap || (ruleMap = new (require('eslint').Linter)().getRules())
  return map.get(name) || null
}
/**
 * @template {object} T
 * @param {T} target
 * @param {Partial<T>[]} propsArray
 * @returns {T}
 */
function newProxy(target, ...propsArray) {
  const result = new Proxy(
    {},
    {
      get(_object, key) {
        for (const props of propsArray) {
          if (key in props) {
            // @ts-expect-error
            return props[key]
          }
        }
        // @ts-expect-error
        return target[key]
      },

      has(_object, key) {
        return key in target
      },
      ownKeys(_object) {
        return Reflect.ownKeys(target)
      },
      getPrototypeOf(_object) {
        return Reflect.getPrototypeOf(target)
      }
    }
  )
  return /** @type {T} */ (result)
}
/**
 * Wrap the rule context object to override methods which access to tokens (such as getTokenAfter).
 * @param {RuleContext} context The rule context object.
 * @param {ParserServices.TokenStore} tokenStore The token store object for template.
 * @param {Object} options The option of this rule.
 * @param {boolean} [options.applyDocument] If `true`, apply check to document fragment.
 * @returns {RuleContext}
 */
function wrapContextToOverrideTokenMethods(context, tokenStore, options) {
  const eslintSourceCode = context.getSourceCode()
  const rootNode = options.applyDocument
    ? context.parserServices.getDocumentFragment &&
      context.parserServices.getDocumentFragment()
    : eslintSourceCode.ast.templateBody
  /** @type {Token[] | null} */
  let tokensAndComments = null
  function getTokensAndComments() {
    if (tokensAndComments) {
      return tokensAndComments
    }
    tokensAndComments = rootNode
      ? tokenStore.getTokens(rootNode, {
          includeComments: true
        })
      : []
    return tokensAndComments
  }

  /** @param {number} index */
  function getNodeByRangeIndex(index) {
    if (!rootNode) {
      return eslintSourceCode.ast
    }

    /** @type {ASTNode} */
    let result = eslintSourceCode.ast
    /** @type {ASTNode[]} */
    const skipNodes = []
    let breakFlag = false

    traverseNodes(rootNode, {
      enterNode(node, parent) {
        if (breakFlag) {
          return
        }
        if (skipNodes[0] === parent) {
          skipNodes.unshift(node)
          return
        }
        if (node.range[0] <= index && index < node.range[1]) {
          result = node
        } else {
          skipNodes.unshift(node)
        }
      },
      leaveNode(node) {
        if (breakFlag) {
          return
        }
        if (result === node) {
          breakFlag = true
        } else if (skipNodes[0] === node) {
          skipNodes.shift()
        }
      }
    })
    return result
  }
  const sourceCode = newProxy(
    eslintSourceCode,
    {
      // @ts-ignore
      get tokensAndComments() {
        return getTokensAndComments()
      },
      getNodeByRangeIndex
    },
    tokenStore
  )

  const containerScopes = new WeakMap()

  /**
   * @param {ASTNode} node
   */
  function getContainerScope(node) {
    const exprContainer = getVExpressionContainer(node)
    if (!exprContainer) {
      return null
    }
    const cache = containerScopes.get(exprContainer)
    if (cache) {
      return cache
    }
    const programNode = eslintSourceCode.ast
    const parserOptions = context.parserOptions || {}
    const ecmaFeatures = parserOptions.ecmaFeatures || {}
    const ecmaVersion = parserOptions.ecmaVersion || 2020
    const sourceType = programNode.sourceType
    try {
      const eslintScope = createRequire(require.resolve('eslint'))(
        'eslint-scope'
      )
      const expStmt = newProxy(exprContainer, {
        // @ts-ignore
        type: 'ExpressionStatement'
      })
      const scopeProgram = newProxy(programNode, {
        // @ts-ignore
        body: [expStmt]
      })
      const scope = eslintScope.analyze(scopeProgram, {
        ignoreEval: true,
        nodejsScope: false,
        impliedStrict: ecmaFeatures.impliedStrict,
        ecmaVersion,
        sourceType,
        fallback: getFallbackKeys
      })
      containerScopes.set(exprContainer, scope)
      return scope
    } catch (error) {
      // ignore
      // console.log(error)
    }

    return null
  }
  return newProxy(context, {
    getSourceCode() {
      return sourceCode
    },
    getDeclaredVariables(node) {
      const scope = getContainerScope(node)
      if (scope) {
        return scope.getDeclaredVariables(node)
      }

      return context.getDeclaredVariables(node)
    }
  })
}

/**
 * Wrap the rule context object to override report method to skip the dynamic argument.
 * @param {RuleContext} context The rule context object.
 * @returns {RuleContext}
 */
function wrapContextToOverrideReportMethodToSkipDynamicArgument(context) {
  const sourceCode = context.getSourceCode()
  const templateBody = sourceCode.ast.templateBody
  if (!templateBody) {
    return context
  }
  /** @type {Range[]} */
  const directiveKeyRanges = []
  traverseNodes(templateBody, {
    enterNode(node, parent) {
      if (
        parent &&
        parent.type === 'VDirectiveKey' &&
        node.type === 'VExpressionContainer'
      ) {
        directiveKeyRanges.push(node.range)
      }
    },
    leaveNode() {}
  })

  return {
    // @ts-expect-error
    __proto__: context,
    report(descriptor, ...args) {
      let range = null
      if (descriptor.loc) {
        const startLoc = descriptor.loc.start || descriptor.loc
        const endLoc = descriptor.loc.end || startLoc
        range = [
          sourceCode.getIndexFromLoc(startLoc),
          sourceCode.getIndexFromLoc(endLoc)
        ]
      } else if (descriptor.node) {
        range = descriptor.node.range
      }
      if (range) {
        for (const directiveKeyRange of directiveKeyRanges) {
          if (
            range[0] < directiveKeyRange[1] &&
            directiveKeyRange[0] < range[1]
          ) {
            return
          }
        }
      }
      context.report(descriptor, ...args)
    }
  }
}

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------

module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `mpx-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {TemplateListener} templateBodyVisitor The visitor to traverse the template body.
   * @param {RuleListener} [scriptVisitor] The visitor to traverse the script.
   * @returns {RuleListener} The merged visitor.
   */
  defineTemplateBodyVisitor,

  /**
   * @callback WrapCoreRuleCreate
   * @param {RuleContext} ruleContext
   * @param {WrapCoreRuleCreateContext} wrapContext
   * @returns {TemplateListener}
   *
   * @typedef {object} WrapCoreRuleCreateContext
   * @property {RuleListener} coreHandlers
   */
  /**
   * @callback WrapCoreRulePreprocess
   * @param {RuleContext} ruleContext
   * @param {WrapCoreRulePreprocessContext} wrapContext
   * @returns {void}
   *
   * @typedef {object} WrapCoreRulePreprocessContext
   * @property { (override: Partial<RuleContext>) => RuleContext } wrapContextToOverrideProperties Wrap the rule context object to override
   * @property { (visitor: TemplateListener) => void } defineVisitor Define template body visitor
   */
  /**
   * Wrap a given core rule to apply it to Vue.js template.
   * @param {string} coreRuleName The name of the core rule implementation to wrap.
   * @param {Object} [options] The option of this rule.
   * @param {string[]} [options.categories] The categories of this rule.
   * @param {boolean} [options.skipDynamicArguments] If `true`, skip validation within dynamic arguments.
   * @param {boolean} [options.skipDynamicArgumentsReport] If `true`, skip report within dynamic arguments.
   * @param {boolean} [options.applyDocument] If `true`, apply check to document fragment.
   * @param {WrapCoreRulePreprocess} [options.preprocess] Preprocess to calling create of core rule.
   * @param {WrapCoreRuleCreate} [options.create] If define, extend core rule.
   * @returns {RuleModule} The wrapped rule implementation.
   */
  wrapCoreRule(coreRuleName, options) {
    const coreRule = getCoreRule(coreRuleName)
    if (!coreRule) {
      return {
        meta: {
          type: 'problem',
          docs: {
            url: `https://eslint.vuejs.org/rules/${coreRuleName}.html`
          }
        },
        create(context) {
          return defineTemplateBodyVisitor(context, {
            "VElement[name='template'][parent.type='VDocumentFragment']"(node) {
              context.report({
                node,
                message: `Failed to extend ESLint core rule "${coreRuleName}". You may be able to use this rule by upgrading the version of ESLint. If you cannot upgrade it, turn off this rule.`
              })
            }
          })
        }
      }
    }

    let description = coreRule.meta.docs.description
    if (description) {
      description += ' in `<template>`'
    }

    const {
      categories,
      skipDynamicArguments,
      skipDynamicArgumentsReport,
      applyDocument,
      preprocess,
      create
    } = options || {}
    return {
      create(context) {
        const tokenStore =
          context.parserServices.getTemplateBodyTokenStore &&
          context.parserServices.getTemplateBodyTokenStore()

        // The `context.getSourceCode()` cannot access the tokens of templates.
        // So override the methods which access to tokens by the `tokenStore`.
        if (tokenStore) {
          context = wrapContextToOverrideTokenMethods(context, tokenStore, {
            applyDocument
          })
        }

        if (skipDynamicArgumentsReport) {
          context =
            wrapContextToOverrideReportMethodToSkipDynamicArgument(context)
        }

        /** @type {TemplateListener} */
        const handlers = {}

        if (preprocess) {
          preprocess(context, {
            wrapContextToOverrideProperties(override) {
              context = newProxy(context, override)
              return context
            },
            defineVisitor(visitor) {
              compositingVisitors(handlers, visitor)
            }
          })
        }

        const coreHandlers = coreRule.create(context)
        compositingVisitors(handlers, coreHandlers)

        // Move `Program` handlers to `VElement[parent.type!='VElement']`
        if (handlers.Program) {
          handlers[
            applyDocument
              ? 'VDocumentFragment'
              : "VElement[parent.type!='VElement']"
          ] = /** @type {any} */ (handlers.Program)
          delete handlers.Program
        }
        if (handlers['Program:exit']) {
          handlers[
            applyDocument
              ? 'VDocumentFragment:exit'
              : "VElement[parent.type!='VElement']:exit"
          ] = /** @type {any} */ (handlers['Program:exit'])
          delete handlers['Program:exit']
        }

        if (skipDynamicArguments) {
          let withinDynamicArguments = false
          for (const name of Object.keys(handlers)) {
            const original = handlers[name]
            /** @param {any[]} args */
            handlers[name] = (...args) => {
              if (withinDynamicArguments) return
              // @ts-expect-error
              original(...args)
            }
          }
          handlers['VDirectiveKey > VExpressionContainer'] = () => {
            withinDynamicArguments = true
          }
          handlers['VDirectiveKey > VExpressionContainer:exit'] = () => {
            withinDynamicArguments = false
          }
        }

        if (create) {
          compositingVisitors(handlers, create(context, { coreHandlers }))
        }

        // if (applyDocument) {
        //   // Apply the handlers to document.
        //   return defineDocumentVisitor(context, handlers)
        // }
        // Apply the handlers to templates.
        return defineTemplateBodyVisitor(context, handlers)
      },

      meta: Object.assign({}, coreRule.meta, {
        docs: Object.assign({}, coreRule.meta.docs, {
          description,
          category: null,
          categories,
          url: `https://eslint.vuejs.org/rules/${path.basename(
            coreRule.meta.docs.url || ''
          )}.html`,
          extensionRule: true,
          coreRuleUrl: coreRule.meta.docs.url
        })
      })
    }
  },
  /**
   * Checks whether the given value is defined.
   * @template T
   * @param {T | null | undefined} v
   * @returns {v is T}
   */
  isDef,
  /**
   * Get the previous sibling element of the given element.
   * @param {VElement} node The element node to get the previous sibling element.
   * @returns {VElement|null} The previous sibling element.
   */
  prevSibling(node) {
    let prevElement = null

    for (const siblingNode of (node.parent && node.parent.children) || []) {
      if (siblingNode === node) {
        return prevElement
      }
      if (siblingNode.type === 'VElement') {
        prevElement = siblingNode
      }
    }

    return null
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {VElement} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {boolean} `true` if the start tag has the attribute.
   */
  hasAttribute(node, name, value) {
    return Boolean(this.getAttribute(node, name, value))
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {VElement} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {boolean} `true` if the start tag has the directive.
   */
  hasDirective(node, name, argument) {
    return Boolean(this.getDirective(node, name, argument))
  },

  /**
   * Check whether the given directive attribute has their empty value (`=""`).
   * @param {VDirective} node The directive attribute node to check.
   * @param {RuleContext} context The rule context to use parser services.
   * @returns {boolean} `true` if the directive attribute has their empty value (`=""`).
   */
  isEmptyValueDirective(node, context) {
    if (node.value == null) {
      return false
    }
    if (node.value.expression != null) {
      return false
    }

    let valueText = context.getSourceCode().getText(node.value)
    if (
      (valueText[0] === '"' || valueText[0] === "'") &&
      valueText[0] === valueText[valueText.length - 1]
    ) {
      // quoted
      valueText = valueText.slice(1, -1)
    }
    if (!valueText || valueText === '{{}}') {
      // empty
      return true
    }
    return false
  },

  /**
   * Check whether the given directive attribute has their empty expression value (e.g. `=" "`, `="/* &ast;/"`).
   * @param {VDirective} node The directive attribute node to check.
   * @param {RuleContext} context The rule context to use parser services.
   * @returns {boolean} `true` if the directive attribute has their empty expression value.
   */
  isEmptyExpressionValueDirective(node, context) {
    if (node.value == null) {
      return false
    }
    if (node.value.expression != null) {
      return false
    }

    const valueNode = node.value
    const tokenStore = context.parserServices.getTemplateBodyTokenStore()
    let quote1 = null
    let quote2 = null
    // `node.value` may be only comments, so cannot get the correct tokens with `tokenStore.getTokens(node.value)`.
    for (const token of tokenStore.getTokens(node)) {
      if (token.range[1] <= valueNode.range[0]) {
        continue
      }
      if (valueNode.range[1] <= token.range[0]) {
        // empty
        return true
      }
      if (
        !quote1 &&
        token.type === 'Punctuator' &&
        (token.value === '"' || token.value === "'")
      ) {
        quote1 = token
        continue
      }
      if (
        !quote2 &&
        quote1 &&
        token.type === 'Punctuator' &&
        token.value === quote1.value
      ) {
        quote2 = token
        continue
      }
      // not empty
      return false
    }
    // empty
    return true
  },

  /**
   * Get the attribute which has the given name.
   * @param {VElement} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {VAttribute | null} The found attribute.
   */
  getAttribute(node, name, value) {
    return (
      node.startTag.attributes.find(
        /**
         * @param {VAttribute | VDirective} node
         * @returns {node is VAttribute}
         */
        (node) => {
          return (
            !node.directive &&
            node.key.name === name &&
            (value === undefined ||
              (node.value != null && node.value.value === value))
          )
        }
      ) || null
    )
  },

  /**
   * Get the directive list which has the given name.
   * @param {VElement | VStartTag} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @returns {VDirective[]} The array of `v-slot` directives.
   */
  getDirectives(node, name) {
    const attributes =
      node.type === 'VElement' ? node.startTag.attributes : node.attributes
    return attributes.filter(
      /**
       * @param {VAttribute | VDirective} node
       * @returns {node is VDirective}
       */
      (node) => {
        return node.directive && node.key.name.name === name
      }
    )
  },
  /**
   * Get the directive which has the given name.
   * @param {VElement} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {VDirective | null} The found directive.
   */
  getDirective(node, name, argument) {
    return (
      node.startTag.attributes.find(
        /**
         * @param {VAttribute | VDirective} node
         * @returns {node is VDirective}
         */
        (node) => {
          return (
            node.directive &&
            node.key.name.name === name &&
            (argument === undefined ||
              (node.key.argument &&
                node.key.argument.type === 'VIdentifier' &&
                node.key.argument.name) === argument)
          )
        }
      ) || null
    )
  },

  /**
   * Returns the list of all registered components
   * @param {ObjectExpression} componentObject
   * @returns { { node: Property, name: string }[] } Array of ASTNodes
   */
  getRegisteredComponents(componentObject) {
    const componentsNode = componentObject.properties.find(
      /**
       * @param {ESNode} p
       * @returns {p is (Property & { key: Identifier & {name: 'components'}, value: ObjectExpression })}
       */
      (p) => {
        return (
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'components' &&
          p.value.type === 'ObjectExpression'
        )
      }
    )

    if (!componentsNode) {
      return []
    }

    return componentsNode.value.properties
      .filter(isProperty)
      .map((node) => {
        const name = getStaticPropertyName(node)
        return name ? { node, name } : null
      })
      .filter(isDef)
  },

  /**
   * Check whether the previous sibling element has `if` or `elif` directive.
   * @param {VElement} node The element node to check.
   * @returns {boolean} `true` if the previous sibling element has `if` or `elif` directive.
   */
  prevElementHasIf(node) {
    const prev = this.prevSibling(node)
    return (
      prev != null &&
      prev.startTag.attributes.some(
        (a) =>
          a.directive &&
          (a.key.name.name === 'if' || a.key.name.name === 'elif')
      )
    )
  },

  /**
   * Check whether the given node is a custom component or not.
   * @param {VElement} node The start tag node to check.
   * @returns {boolean} `true` if the node is a custom component.
   */
  isCustomComponent(node) {
    return (
      !this.isMpElementName(node.rawName) ||
      (node.rawName === 'component' && this.hasAttribute(node, 'is'))
    )
  },

  /**
   * Check whether the given node is a HTML element or not.
   * @param {VElement} node The node to check.
   * @returns {boolean} `true` if the node is a HTML element.
   */
  isHtmlElementNode(node) {
    return node.namespace === NS.HTML
  },

  /**
   * Check whether the given node is a SVG element or not.
   * @param {VElement} node The node to check.
   * @returns {boolean} `true` if the name is a SVG element.
   */
  isSvgElementNode(node) {
    return node.namespace === NS.SVG
  },

  /**
   * Check whether the given name is a MathML element or not.
   * @param {VElement} node The node to check.
   * @returns {boolean} `true` if the node is a MathML element.
   */
  isMathMLElementNode(node) {
    return node.namespace === NS.MathML
  },

  /**
   * Check whether the given name is an well-known element or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is an well-known element name.
   */
  isHtmlWellKnownElementName(name) {
    return HTML_ELEMENT_NAMES.has(name)
  },

  /**
   * Check whether the given name is an miniprogram element or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is an miniprogram element name.
   */
  isMpElementName(name) {
    return MP_ELEMENT_NAMES.has(name)
  },

  /**
   * Check whether the given name is an well-known SVG element or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is an well-known SVG element name.
   */
  isSvgWellKnownElementName(name) {
    return SVG_ELEMENT_NAMES.has(name)
  },

  /**
   * Check whether the given name is a void element name or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is a void element name.
   */
  isHtmlVoidElementName(name) {
    return VOID_ELEMENT_NAMES.has(name)
  },
  /**
   * Gets the property name of a given node.
   * @param {Property|AssignmentProperty|MethodDefinition|MemberExpression} node - The node to get.
   * @return {string|null} The property name if static. Otherwise, null.
   */
  getStaticPropertyName,
  /**
   * Gets the string of a given node.
   * @param {Literal|TemplateLiteral} node - The node to get.
   * @return {string|null} The string if static. Otherwise, null.
   */
  getStringLiteralValue,
  /**
   * Get all props by looking at all component's properties
   * @param {ObjectExpression} componentObject Object with component definition
   * @return {(ComponentArrayProp | ComponentObjectProp | ComponentUnknownProp)[]} Array of component props
   */
  getComponentPropsFromOptions,
  /**
   * Get all props by looking at all component's properties
   * @param {ObjectExpression} componentObject Object with component definition
   * @return {(ComponentArrayProp | ComponentObjectProp)[]} Array of component props in format: [{key?: String, value?: ASTNode, node: ASTNod}]
   */
  getComponentProps(componentObject) {
    const propsNode = componentObject.properties.find(
      /**
       * @param {ESNode} p
       * @returns {p is (Property & { key: Identifier & {name: 'props'}, value: ObjectExpression | ArrayExpression })}
       */
      (p) => {
        return (
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          (p.key.name === 'props' || p.key.name === 'properties') &&
          (p.value.type === 'ObjectExpression' ||
            p.value.type === 'ArrayExpression')
        )
      }
    )

    if (!propsNode) {
      return []
    }

    if (propsNode.value.type === 'ObjectExpression') {
      return propsNode.value.properties.filter(isProperty).map((prop) => {
        const propName = getStaticPropertyName(prop)
        if (propName != null) {
          return {
            type: 'object',
            key: prop.key,
            propName,
            value: skipTSAsExpression(prop.value),
            node: prop
          }
        }
        return {
          type: 'object',
          key: null,
          propName: null,
          value: skipTSAsExpression(prop.value),
          node: prop
        }
      })
    } else {
      return propsNode.value.elements.filter(isDef).map((prop) => {
        if (prop.type === 'Literal' || prop.type === 'TemplateLiteral') {
          const propName = getStringLiteralValue(prop)
          if (propName != null) {
            return {
              type: 'array',
              key: prop,
              propName,
              value: null,
              node: prop
            }
          }
        }
        return {
          type: 'array',
          key: null,
          propName: null,
          value: null,
          node: prop
        }
      })
    }
  },

  /**
   * Get all emits by looking at all component's properties
   * @param {ObjectExpression} componentObject Object with component definition
   * @return {(ComponentArrayEmit | ComponentObjectEmit)[]} Array of component emits in format: [{key?: String, value?: ASTNode, node: ASTNod}]
   */
  getComponentEmits(componentObject) {
    const emitsNode = componentObject.properties.find(
      /**
       * @param {ESNode} p
       * @returns {p is (Property & { key: Identifier & {name: 'emits'}, value: ObjectExpression | ArrayExpression })}
       */
      (p) => {
        return (
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'emits' &&
          (p.value.type === 'ObjectExpression' ||
            p.value.type === 'ArrayExpression')
        )
      }
    )

    if (!emitsNode) {
      return []
    }

    if (emitsNode.value.type === 'ObjectExpression') {
      return emitsNode.value.properties.filter(isProperty).map((prop) => {
        const emitName = getStaticPropertyName(prop)
        if (emitName != null) {
          return {
            type: 'object',
            key: prop.key,
            emitName,
            value: skipTSAsExpression(prop.value),
            node: prop
          }
        }
        return {
          type: 'object',
          key: null,
          emitName: null,
          value: skipTSAsExpression(prop.value),
          node: prop
        }
      })
    } else {
      return emitsNode.value.elements.filter(isDef).map((prop) => {
        if (prop.type === 'Literal' || prop.type === 'TemplateLiteral') {
          const emitName = getStringLiteralValue(prop)
          if (emitName != null) {
            return {
              type: 'array',
              key: prop,
              emitName,
              value: null,
              node: prop
            }
          }
        }
        return {
          type: 'array',
          key: null,
          emitName: null,
          value: null,
          node: prop
        }
      })
    }
  },

  /**
   * Get all computed properties by looking at all component's properties
   * @param {ObjectExpression} componentObject Object with component definition
   * @return {ComponentComputedProperty[]} Array of computed properties in format: [{key: String, value: ASTNode}]
   */
  getComputedProperties(componentObject) {
    const computedPropertiesNode = componentObject.properties.find(
      /**
       * @param {ESNode} p
       * @returns {p is (Property & { key: Identifier & {name: 'computed'}, value: ObjectExpression })}
       */
      (p) => {
        return (
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          p.key.name === 'computed' &&
          p.value.type === 'ObjectExpression'
        )
      }
    )

    if (!computedPropertiesNode) {
      return []
    }

    return computedPropertiesNode.value.properties
      .filter(isProperty)
      .map((cp) => {
        const key = getStaticPropertyName(cp)
        /** @type {Expression} */
        const propValue = skipTSAsExpression(cp.value)
        /** @type {BlockStatement | null} */
        let value = null

        if (propValue.type === 'FunctionExpression') {
          value = propValue.body
        } else if (propValue.type === 'ObjectExpression') {
          const get = propValue.properties.find(
            /**
             * @param {ESNode} p
             * @returns { p is (Property & { value: FunctionExpression }) }
             */
            (p) =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'get' &&
              p.value.type === 'FunctionExpression'
          )
          value = get ? get.value.body : null
        }

        return { key, value }
      })
  },

  isMpxFile,

  /**
   * Check if current file is a Vue instance or component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param { (node: ObjectExpression, type: VueObjectType) => void } cb Callback function
   */
  executeOnVue(context, cb) {
    return compositingVisitors(
      this.executeOnVueComponent(context, cb),
      this.executeOnVueInstance(context, cb)
    )
  },

  /**
   * Define handlers to traverse the Vue Objects.
   * Some special events are available to visitor.
   *
   * - `onVueObjectEnter` ... Event when Vue Object is found.
   * - `onVueObjectExit` ... Event when Vue Object visit ends.
   * - `onSetupFunctionEnter` ... Event when setup function found.
   * - `onRenderFunctionEnter` ... Event when render function found.
   *
   * @param {RuleContext} context The ESLint rule context object.
   * @param {VueVisitor} visitor The visitor to traverse the Vue Objects.
   */
  defineVueVisitor(context, visitor) {
    /** @type {VueObjectData | null} */
    let vueStack = null

    /**
     * @param {string} key
     * @param {ESNode} node
     */
    function callVisitor(key, node) {
      if (visitor[key] && vueStack) {
        // @ts-expect-error
        visitor[key](node, vueStack)
      }
    }

    /** @type {NodeListener} */
    const vueVisitor = {}
    for (const key in visitor) {
      vueVisitor[key] = (node) => callVisitor(key, node)
    }

    /**
     * @param {ObjectExpression} node
     */
    vueVisitor.ObjectExpression = (node) => {
      const type = getVueObjectType(context, node)
      if (type) {
        vueStack = {
          node,
          type,
          parent: vueStack,
          get functional() {
            const functional = node.properties.find(
              /**
               * @param {Property | SpreadElement} p
               * @returns {p is Property}
               */
              (p) =>
                p.type === 'Property' &&
                getStaticPropertyName(p) === 'functional'
            )
            if (!functional) {
              return false
            }
            if (
              functional.value.type === 'Literal' &&
              functional.value.value === false
            ) {
              return false
            }
            return true
          }
        }
        callVisitor('onVueObjectEnter', node)
      }
      callVisitor('ObjectExpression', node)
    }
    vueVisitor['ObjectExpression:exit'] = (node) => {
      callVisitor('ObjectExpression:exit', node)
      if (vueStack && vueStack.node === node) {
        callVisitor('onVueObjectExit', node)
        vueStack = vueStack.parent
      }
    }
    if (visitor.onSetupFunctionEnter || visitor.onRenderFunctionEnter) {
      /** @param { (FunctionExpression | ArrowFunctionExpression) & { parent: Property } } node */
      vueVisitor[
        'Property[value.type=/^(Arrow)?FunctionExpression$/] > :function'
      ] = (node) => {
        /** @type {Property} */
        const prop = node.parent
        if (vueStack && prop.parent === vueStack.node && prop.value === node) {
          const name = getStaticPropertyName(prop)
          if (name === 'setup') {
            callVisitor('onSetupFunctionEnter', node)
          } else if (name === 'render') {
            callVisitor('onRenderFunctionEnter', node)
          }
        }
        callVisitor(
          'Property[value.type=/^(Arrow)?FunctionExpression$/] > :function',
          node
        )
      }
    }

    return vueVisitor
  },

  getVueObjectType,
  compositingVisitors,

  /**
   * Check if current file is a Vue instance (new Vue) and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param { (node: ObjectExpression, type: VueObjectType) => void } cb Callback function
   */
  executeOnVueInstance(context, cb) {
    return {
      /** @param {ObjectExpression} node */
      'ObjectExpression:exit'(node) {
        const type = getVueObjectType(context, node)
        if (!type || type !== 'instance') return
        cb(node, type)
      }
    }
  },

  /**
   * Check if current file is a Vue component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param { (node: ObjectExpression, type: VueObjectType) => void } cb Callback function
   */
  executeOnVueComponent(context, cb) {
    return {
      /** @param {ObjectExpression} node */
      'ObjectExpression:exit'(node) {
        const type = getVueObjectType(context, node)
        if (
          !type ||
          (type !== 'mark' && type !== 'export' && type !== 'definition')
        )
          return
        cb(node, type)
      }
    }
  },

  /**
   * Check call `Vue.component` and call callback.
   * @param {RuleContext} _context The ESLint rule context object.
   * @param { (node: CallExpression) => void } cb Callback function
   */
  executeOnCallVueComponent(_context, cb) {
    return {
      /** @param {Identifier & { parent: MemberExpression & { parent: CallExpression } } } node */
      "CallExpression > MemberExpression > Identifier[name='component']": (
        node
      ) => {
        const callExpr = node.parent.parent
        const callee = callExpr.callee

        if (callee.type === 'MemberExpression') {
          const calleeObject = skipTSAsExpression(callee.object)

          if (
            calleeObject.type === 'Identifier' &&
            // calleeObject.name === 'Vue' && // Any names can be used in Vue.js 3.x. e.g. app.component()
            callee.property === node &&
            callExpr.arguments.length >= 1
          ) {
            cb(callExpr)
          }
        }
      }
    }
  },
  /**
   * Return generator with all properties
   * @param {ObjectExpression} node Node to check
   * @param {Set<GroupName>} groups Name of parent group
   * @returns {IterableIterator<ComponentPropertyData>}
   */
  *iterateProperties(node, groups) {
    for (const item of node.properties) {
      if (item.type !== 'Property') {
        continue
      }

      const name = /** @type {GroupName | null} */ (getStaticPropertyName(item))
      if (!name || !groups.has(name)) continue

      if (item.value.type === 'ArrayExpression') {
        yield* this.iterateArrayExpression(item.value, name)
      } else if (item.value.type === 'ObjectExpression') {
        yield* this.iterateObjectExpression(item.value, name)
      } else if (item.value.type === 'FunctionExpression') {
        yield* this.iterateFunctionExpression(item.value, name)
      } else if (item.value.type === 'ArrowFunctionExpression') {
        yield* this.iterateArrowFunctionExpression(item.value, name)
      }
    }
  },

  /**
   * Return generator with all elements inside ArrayExpression
   * @param {ArrayExpression} node Node to check
   * @param {GroupName} groupName Name of parent group
   * @returns {IterableIterator<ComponentArrayPropertyData>}
   */
  *iterateArrayExpression(node, groupName) {
    for (const item of node.elements) {
      if (
        item &&
        (item.type === 'Literal' || item.type === 'TemplateLiteral')
      ) {
        const name = getStringLiteralValue(item)
        if (name) {
          yield { type: 'array', name, groupName, node: item }
        }
      }
    }
  },

  /**
   * Return generator with all elements inside ObjectExpression
   * @param {ObjectExpression} node Node to check
   * @param {GroupName} groupName Name of parent group
   * @returns {IterableIterator<ComponentObjectPropertyData>}
   */
  *iterateObjectExpression(node, groupName) {
    /** @type {Set<Property> | undefined} */
    let usedGetter
    for (const item of node.properties) {
      if (item.type === 'Property') {
        const key = item.key
        if (
          key.type === 'Identifier' ||
          key.type === 'Literal' ||
          key.type === 'TemplateLiteral'
        ) {
          const name = getStaticPropertyName(item)
          if (name) {
            if (item.kind === 'set') {
              // find getter pair
              if (
                node.properties.some((item2) => {
                  if (item2.type === 'Property' && item2.kind === 'get') {
                    if (!usedGetter) {
                      usedGetter = new Set()
                    }
                    if (usedGetter.has(item2)) {
                      return false
                    }
                    const getterName = getStaticPropertyName(item2)
                    if (getterName === name) {
                      usedGetter.add(item2)
                      return true
                    }
                  }
                  return false
                })
              ) {
                // has getter pair
                continue
              }
            }
            yield {
              type: 'object',
              name,
              groupName,
              node: key,
              property: item
            }
          }
        }
      }
    }
  },

  /**
   * Return generator with all elements inside FunctionExpression
   * @param {FunctionExpression} node Node to check
   * @param {GroupName} groupName Name of parent group
   * @returns {IterableIterator<ComponentObjectPropertyData>}
   */
  *iterateFunctionExpression(node, groupName) {
    if (node.body.type === 'BlockStatement') {
      for (const item of node.body.body) {
        if (
          item.type === 'ReturnStatement' &&
          item.argument &&
          item.argument.type === 'ObjectExpression'
        ) {
          yield* this.iterateObjectExpression(item.argument, groupName)
        }
      }
    }
  },

  /**
   * Return generator with all elements inside ArrowFunctionExpression
   * @param {ArrowFunctionExpression} node Node to check
   * @param {GroupName} groupName Name of parent group
   * @returns {IterableIterator<ComponentObjectPropertyData>}
   */
  *iterateArrowFunctionExpression(node, groupName) {
    const body = node.body
    if (body.type === 'BlockStatement') {
      for (const item of body.body) {
        if (
          item.type === 'ReturnStatement' &&
          item.argument &&
          item.argument.type === 'ObjectExpression'
        ) {
          yield* this.iterateObjectExpression(item.argument, groupName)
        }
      }
    } else if (body.type === 'ObjectExpression') {
      yield* this.iterateObjectExpression(body, groupName)
    }
  },

  /**
   * Find all functions which do not always return values
   * @param {boolean} treatUndefinedAsUnspecified
   * @param { (node: ESNode) => void } cb Callback function
   * @returns {RuleListener}
   */
  executeOnFunctionsWithoutReturn(treatUndefinedAsUnspecified, cb) {
    /**
     * @typedef {object} FuncInfo
     * @property {FuncInfo} funcInfo
     * @property {CodePath} codePath
     * @property {boolean} hasReturn
     * @property {boolean} hasReturnValue
     * @property {ESNode} node
     */

    /** @type {FuncInfo} */
    let funcInfo

    /** @param {CodePathSegment} segment */
    function isReachable(segment) {
      return segment.reachable
    }

    function isValidReturn() {
      if (
        funcInfo.codePath &&
        funcInfo.codePath.currentSegments.some(isReachable)
      ) {
        return false
      }
      return !treatUndefinedAsUnspecified || funcInfo.hasReturnValue
    }

    return {
      /**
       * @param {CodePath} codePath
       * @param {ESNode} node
       */
      onCodePathStart(codePath, node) {
        funcInfo = {
          codePath,
          funcInfo,
          hasReturn: false,
          hasReturnValue: false,
          node
        }
      },
      onCodePathEnd() {
        funcInfo = funcInfo.funcInfo
      },
      /** @param {ReturnStatement} node */
      ReturnStatement(node) {
        funcInfo.hasReturn = true
        funcInfo.hasReturnValue = Boolean(node.argument)
      },
      /** @param {ArrowFunctionExpression} node */
      'ArrowFunctionExpression:exit'(node) {
        if (!isValidReturn() && !node.expression) {
          cb(funcInfo.node)
        }
      },
      'FunctionExpression:exit'() {
        if (!isValidReturn()) {
          cb(funcInfo.node)
        }
      }
    }
  },

  /**
   * Check whether the component is declared in a single line or not.
   * @param {ASTNode} node
   * @returns {boolean}
   */
  isSingleLine(node) {
    return node.loc.start.line === node.loc.end.line
  },

  /**
   * Check whether the templateBody of the program has invalid EOF or not.
   * @param {Program} node The program node to check.
   * @returns {boolean} `true` if it has invalid EOF.
   */
  hasInvalidEOF(node) {
    const body = node.templateBody
    if (body == null || body.errors == null) {
      return false
    }
    return body.errors.some(
      (error) => typeof error.code === 'string' && error.code.startsWith('eof-')
    )
  },

  /**
   * Get the chaining nodes of MemberExpression.
   *
   * @param  {ESNode} node The node to parse
   * @return {[ESNode, ...MemberExpression[]]} The chaining nodes
   */
  getMemberChaining(node) {
    /** @type {MemberExpression[]} */
    const nodes = []
    let n = skipChainExpression(node)

    while (n.type === 'MemberExpression') {
      nodes.push(n)
      n = skipChainExpression(n.object)
    }

    return [n, ...nodes.reverse()]
  },
  /**
   * return two string editdistance
   * @param {string} a string a to compare
   * @param {string} b string b to compare
   * @returns {number}
   */
  editDistance(a, b) {
    if (a === b) {
      return 0
    }
    const alen = a.length
    const blen = b.length
    const dp = Array.from({ length: alen + 1 }).map((_) =>
      Array.from({ length: blen + 1 }).fill(0)
    )
    for (let i = 0; i <= alen; i++) {
      dp[i][0] = i
    }
    for (let j = 0; j <= blen; j++) {
      dp[0][j] = j
    }
    for (let i = 1; i <= alen; i++) {
      for (let j = 1; j <= blen; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
        }
      }
    }
    return dp[alen][blen]
  },
  /**
   * Checks whether the given node is Property.
   */
  isProperty,
  /**
   * Checks whether the given node is AssignmentProperty.
   */
  isAssignmentProperty,
  /**
   * Checks whether the given node is VElement.
   */
  isVElement,
  /**
   * Finds the property with the given name from the given ObjectExpression node.
   */
  findProperty,
  /**
   * Finds the assignment property with the given name from the given ObjectPattern node.
   */
  findAssignmentProperty,
  /**
   * Checks if the given node is a property value.
   * @param {Property} prop
   * @param {Expression} node
   */
  isPropertyChain,
  /**
   * Retrieve `TSAsExpression#expression` value if the given node a `TSAsExpression` node. Otherwise, pass through it.
   */
  skipTSAsExpression,
  /**
   * Retrieve `AssignmentPattern#left` value if the given node a `AssignmentPattern` node. Otherwise, pass through it.
   */
  skipDefaultParamValue,
  /**
   * Retrieve `ChainExpression#expression` value if the given node a `ChainExpression` node. Otherwise, pass through it.
   */
  skipChainExpression,

  /**
   * Check whether the given node is `this` or variable that stores `this`.
   * @param  {ESNode} node The node to check
   * @param {RuleContext} context The rule context to use parser services.
   * @returns {boolean} `true` if the given node is `this`.
   */
  isThis(node, context) {
    if (node.type === 'ThisExpression') {
      return true
    }
    if (node.type !== 'Identifier') {
      return false
    }
    const parent = node.parent
    if (parent.type === 'MemberExpression') {
      if (parent.property === node) {
        return false
      }
    } else if (parent.type === 'Property') {
      if (parent.key === node && !parent.computed) {
        return false
      }
    }

    const variable = findVariable(context.getScope(), node)

    if (variable != null && variable.defs.length === 1) {
      const def = variable.defs[0]
      if (
        def.type === 'Variable' &&
        def.parent.kind === 'const' &&
        def.node.id.type === 'Identifier'
      ) {
        return Boolean(
          def.node && def.node.init && def.node.init.type === 'ThisExpression'
        )
      }
    }
    return false
  },

  /**
   * @param {MemberExpression|Identifier} props
   * @returns { { kind: 'assignment' | 'update' | 'call' , node: ESNode, pathNodes: MemberExpression[] } | null }
   */
  findMutating(props) {
    /** @type {MemberExpression[]} */
    const pathNodes = []
    /** @type {MemberExpression | Identifier | ChainExpression} */
    let node = props
    let target = node.parent
    while (true) {
      if (target.type === 'AssignmentExpression') {
        if (target.left === node) {
          // this.xxx <=|+=|-=>
          return {
            kind: 'assignment',
            node: target,
            pathNodes
          }
        }
      } else if (target.type === 'UpdateExpression') {
        // this.xxx <++|-->
        return {
          kind: 'update',
          node: target,
          pathNodes
        }
      } else if (target.type === 'CallExpression') {
        if (pathNodes.length > 0 && target.callee === node) {
          const mem = pathNodes[pathNodes.length - 1]
          const callName = getStaticPropertyName(mem)
          if (
            callName &&
            /^push|pop|shift|unshift|reverse|splice|sort|copyWithin|fill$/u.exec(
              callName
            )
          ) {
            // this.xxx.push()
            pathNodes.pop()
            return {
              kind: 'call',
              node: target,
              pathNodes
            }
          }
        }
      } else if (target.type === 'MemberExpression') {
        if (target.object === node) {
          pathNodes.push(target)
          node = target
          target = target.parent
          continue // loop
        }
      } else if (target.type === 'ChainExpression') {
        node = target
        target = target.parent
        continue // loop
      }

      return null
    }
  },

  /**
   * Wraps composition API trace map in both 'vue' and '@vue/composition-api' imports
   * @param {import('eslint-utils').TYPES.TraceMap} map
   */
  createCompositionApiTraceMap: (map) => ({
    vue: map,
    '@vue/composition-api': map
  }),

  /**
   * Checks whether or not the tokens of two given nodes are same.
   * @param {ASTNode} left A node 1 to compare.
   * @param {ASTNode} right A node 2 to compare.
   * @param {ParserServices.TokenStore | SourceCode} sourceCode The ESLint source code object.
   * @returns {boolean} the source code for the given node.
   */
  equalTokens(left, right, sourceCode) {
    const tokensL = sourceCode.getTokens(left)
    const tokensR = sourceCode.getTokens(right)

    if (tokensL.length !== tokensR.length) {
      return false
    }
    for (let i = 0; i < tokensL.length; ++i) {
      if (
        tokensL[i].type !== tokensR[i].type ||
        tokensL[i].value !== tokensR[i].value
      ) {
        return false
      }
    }

    return true
  }
}

// ------------------------------------------------------------------------------
// Standard Helpers
// ------------------------------------------------------------------------------

/**
 * Checks whether the given value is defined.
 * @template T
 * @param {T | null | undefined} v
 * @returns {v is T}
 */
function isDef(v) {
  return v != null
}
// ------------------------------------------------------------------------------
// Nodejs Helpers
// ------------------------------------------------------------------------------
/**
 * @param {String} filename
 */
function createRequire(filename) {
  const Module = require('module')
  const moduleCreateRequire =
    // Added in v12.2.0
    Module.createRequire ||
    // Added in v10.12.0, but deprecated in v12.2.0.
    Module.createRequireFromPath ||
    // Polyfill - This is not executed on the tests on node@>=10.
    /**
     * @param {string} filename
     */
    function (filename) {
      const mod = new Module(filename)

      mod.filename = filename
      // @ts-ignore
      mod.paths = Module._nodeModulePaths(path.dirname(filename))
      // @ts-ignore
      mod._compile('module.exports = require;', filename)
      return mod.exports
    }
  return moduleCreateRequire(filename)
}
// ------------------------------------------------------------------------------
// Rule Helpers
// ------------------------------------------------------------------------------

/**
 * Register the given visitor to parser services.
 * If the parser service of `vue-eslint-parser` was not found,
 * this generates a warning.
 *
 * @param {RuleContext} context The rule context to use parser services.
 * @param {TemplateListener} templateBodyVisitor The visitor to traverse the template body.
 * @param {RuleListener} [scriptVisitor] The visitor to traverse the script.
 * @returns {RuleListener} The merged visitor.
 */
function defineTemplateBodyVisitor(
  context,
  templateBodyVisitor,
  scriptVisitor
) {
  if (context.parserServices.defineTemplateBodyVisitor == null) {
    const filename = context.getFilename()
    if (path.extname(filename) === '.mpx') {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          'Use the latest mpx-eslint-parser. See also https://github.com/mpx-ecology/mpx-eslint-parser.'
      })
    }
    return {}
  }
  return context.parserServices.defineTemplateBodyVisitor(
    templateBodyVisitor,
    scriptVisitor
  )
}

/**
 * @template T
 * @param {T} visitor
 * @param {...(TemplateListener | RuleListener | NodeListener)} visitors
 * @returns {T}
 */
function compositingVisitors(visitor, ...visitors) {
  for (const v of visitors) {
    for (const key in v) {
      // @ts-expect-error
      if (visitor[key]) {
        // @ts-expect-error
        const o = visitor[key]
        // @ts-expect-error
        visitor[key] = (...args) => {
          o(...args)
          // @ts-expect-error
          v[key](...args)
        }
      } else {
        // @ts-expect-error
        visitor[key] = v[key]
      }
    }
  }
  return visitor
}

// ------------------------------------------------------------------------------
// AST Helpers
// ------------------------------------------------------------------------------

/**
 * Finds the property with the given name from the given ObjectExpression node.
 * @param {ObjectExpression} node
 * @param {string} name
 * @param { (p: Property) => boolean } [filter]
 * @returns { (Property) | null}
 */
function findProperty(node, name, filter) {
  const predicate = filter
    ? /**
       * @param {Property | SpreadElement} prop
       * @returns {prop is Property}
       */
      (prop) =>
        isProperty(prop) && getStaticPropertyName(prop) === name && filter(prop)
    : /**
       * @param {Property | SpreadElement} prop
       * @returns {prop is Property}
       */
      (prop) => isProperty(prop) && getStaticPropertyName(prop) === name
  return node.properties.find(predicate) || null
}

/**
 * Finds the assignment property with the given name from the given ObjectPattern node.
 * @param {ObjectPattern} node
 * @param {string} name
 * @param { (p: AssignmentProperty) => boolean } [filter]
 * @returns { (AssignmentProperty) | null}
 */
function findAssignmentProperty(node, name, filter) {
  const predicate = filter
    ? /**
       * @param {AssignmentProperty | RestElement} prop
       * @returns {prop is AssignmentProperty}
       */
      (prop) =>
        isAssignmentProperty(prop) &&
        getStaticPropertyName(prop) === name &&
        filter(prop)
    : /**
       * @param {AssignmentProperty | RestElement} prop
       * @returns {prop is AssignmentProperty}
       */
      (prop) =>
        isAssignmentProperty(prop) && getStaticPropertyName(prop) === name
  return node.properties.find(predicate) || null
}

/**
 * Checks whether the given node is Property.
 * @param {Property | SpreadElement} node
 * @returns {node is Property}
 */
function isProperty(node) {
  return node.type === 'Property'
}
/**
 * Checks whether the given node is AssignmentProperty.
 * @param {AssignmentProperty | RestElement} node
 * @returns {node is AssignmentProperty}
 */
function isAssignmentProperty(node) {
  return node.type === 'Property'
}
/**
 * Checks whether the given node is VElement.
 * @param {VElement | VExpressionContainer | VText} node
 * @returns {node is VElement}
 */
function isVElement(node) {
  return node.type === 'VElement'
}

/**
 * Retrieve `TSAsExpression#expression` value if the given node a `TSAsExpression` node. Otherwise, pass through it.
 * @template T Node type
 * @param {T | TSAsExpression} node The node to address.
 * @returns {T} The `TSAsExpression#expression` value if the node is a `TSAsExpression` node. Otherwise, the node.
 */
function skipTSAsExpression(node) {
  if (!node) {
    return node
  }
  // @ts-expect-error
  if (node.type === 'TSAsExpression') {
    // @ts-expect-error
    return skipTSAsExpression(node.expression)
  }
  // @ts-expect-error
  return node
}

/**
 * Gets the parent node of the given node. This method returns a value ignoring `X as F`.
 * @param {Expression} node
 * @returns {ASTNode}
 */
function getParent(node) {
  let parent = node.parent
  while (parent.type === 'TSAsExpression') {
    parent = parent.parent
  }
  return parent
}

/**
 * Checks if the given node is a property value.
 * @param {Property} prop
 * @param {Expression} node
 */
function isPropertyChain(prop, node) {
  let value = node
  while (value.parent.type === 'TSAsExpression') {
    value = value.parent
  }
  return prop === value.parent && prop.value === value
}

/**
 * Retrieve `AssignmentPattern#left` value if the given node a `AssignmentPattern` node. Otherwise, pass through it.
 * @template T Node type
 * @param {T | AssignmentPattern} node The node to address.
 * @return {T} The `AssignmentPattern#left` value if the node is a `AssignmentPattern` node. Otherwise, the node.
 */
function skipDefaultParamValue(node) {
  if (!node) {
    return node
  }
  // @ts-expect-error
  if (node.type === 'AssignmentPattern') {
    // @ts-expect-error
    return skipDefaultParamValue(node.left)
  }
  // @ts-expect-error
  return node
}

/**
 * Retrieve `ChainExpression#expression` value if the given node a `ChainExpression` node. Otherwise, pass through it.
 * @template T Node type
 * @param {T | ChainExpression} node The node to address.
 * @returns {T} The `ChainExpression#expression` value if the node is a `ChainExpression` node. Otherwise, the node.
 */
function skipChainExpression(node) {
  if (!node) {
    return node
  }
  // @ts-expect-error
  if (node.type === 'ChainExpression') {
    // @ts-expect-error
    return skipChainExpression(node.expression)
  }
  // @ts-expect-error
  return node
}

/**
 * Gets the property name of a given node.
 * @param {Property|AssignmentProperty|MethodDefinition|MemberExpression} node - The node to get.
 * @return {string|null} The property name if static. Otherwise, null.
 */
function getStaticPropertyName(node) {
  if (node.type === 'Property' || node.type === 'MethodDefinition') {
    const key = node.key

    if (!node.computed) {
      if (key.type === 'Identifier') {
        return key.name
      }
    }
    // @ts-expect-error
    return getStringLiteralValue(key)
  } else if (node.type === 'MemberExpression') {
    const property = node.property
    if (!node.computed) {
      if (property.type === 'Identifier') {
        return property.name
      }
      return null
    }
    // @ts-expect-error
    return getStringLiteralValue(property)
  }
  return null
}

/**
 * Gets the string of a given node.
 * @param {Literal|TemplateLiteral} node - The node to get.
 * @param {boolean} [stringOnly]
 * @return {string|null} The string if static. Otherwise, null.
 */
function getStringLiteralValue(node, stringOnly) {
  if (node.type === 'Literal') {
    if (node.value == null) {
      if (!stringOnly && node.bigint != null) {
        return node.bigint
      }
      return null
    }
    if (typeof node.value === 'string') {
      return node.value
    }
    if (!stringOnly) {
      return String(node.value)
    }
    return null
  }
  if (node.type === 'TemplateLiteral') {
    if (node.expressions.length === 0 && node.quasis.length === 1) {
      return node.quasis[0].value.cooked
    }
  }
  return null
}
/**
 * Gets the VExpressionContainer of a given node.
 * @param {ASTNode} node - The node to get.
 * @return {VExpressionContainer|null}
 */
function getVExpressionContainer(node) {
  /** @type {ASTNode | null} */
  let n = node
  while (n && n.type !== 'VExpressionContainer') {
    n = n.parent
  }
  return n
}
// ------------------------------------------------------------------------------
// Mpx Helpers
// ------------------------------------------------------------------------------

/**
 * @param {string} path
 */
function isMpxFile(path) {
  return path.endsWith('.mpx')
}

/**
 * Check whether the given node is a Vue component based
 * on the filename and default export type
 * export default {} in .mpx || .jsx
 * @param {ESNode} node Node to check
 * @param {string} path File name with extension
 * @returns {boolean}
 */
function isVueComponentFile(node, path) {
  return (
    isMpxFile(path) &&
    node.type === 'ExportDefaultDeclaration' &&
    node.declaration.type === 'ObjectExpression'
  )
}

/**
 * Check whether given node is Vue component
 * Vue.component('xxx', {}) || component('xxx', {})
 * @param {ESNode} node Node to check
 * @returns {boolean}
 */
function isVueComponent(node) {
  if (node.type === 'CallExpression') {
    const callee = node.callee

    if (callee.type === 'MemberExpression') {
      const calleeObject = skipTSAsExpression(callee.object)
      if (calleeObject.type === 'Identifier') {
        const propName = getStaticPropertyName(callee)
        if (calleeObject.name === 'Vue') {
          // for Vue.js 2.x
          // Vue.component('xxx', {}) || Vue.mixin({}) || Vue.extend('xxx', {})
          const isFullVueComponentForVue2 =
            propName &&
            ['component', 'mixin', 'extend'].includes(propName) &&
            isObjectArgument(node)

          return Boolean(isFullVueComponentForVue2)
        }

        // for Vue.js 3.x
        // app.component('xxx', {}) || app.mixin({})
        const isFullVueComponent =
          propName &&
          ['component', 'mixin'].includes(propName) &&
          isObjectArgument(node)

        return Boolean(isFullVueComponent)
      }
    }

    if (callee.type === 'Identifier') {
      if (callee.name === 'component') {
        // for Vue.js 2.x
        // component('xxx', {})
        const isDestructedVueComponent = isObjectArgument(node)
        return isDestructedVueComponent
      }
      if (callee.name === 'createApp') {
        // for Vue.js 3.x
        // createApp({})
        const isAppVueComponent = isObjectArgument(node)
        return isAppVueComponent
      }
      if (callee.name === 'defineComponent') {
        // for Vue.js 3.x
        // defineComponent({})
        const isDestructedVueComponent = isObjectArgument(node)
        return isDestructedVueComponent
      }
      if (callee.name === 'createComponent') {
        // for mpxjs
        // createComponent({})
        const isMpxComponent = isObjectArgument(node)
        return isMpxComponent
      }
      if (callee.name === 'createPage') {
        // for mpxjs
        // createComponent({})
        const isMpxPage = isObjectArgument(node)
        return isMpxPage
      }
    }
  }

  return false

  /** @param {CallExpression} node */
  function isObjectArgument(node) {
    return (
      node.arguments.length > 0 &&
      skipTSAsExpression(node.arguments.slice(-1)[0]).type ===
        'ObjectExpression'
    )
  }
}

/**
 * Check whether given node is new Vue instance
 * new Vue({})
 * @param {NewExpression} node Node to check
 * @returns {boolean}
 */
function isVueInstance(node) {
  const callee = node.callee
  return Boolean(
    node.type === 'NewExpression' &&
      callee.type === 'Identifier' &&
      // callee.name === 'Vue' &&
      callee.name === 'mpx' &&
      node.arguments.length &&
      skipTSAsExpression(node.arguments[0]).type === 'ObjectExpression'
  )
}

/**
 * If the given object is a Vue component or instance, returns the Vue definition type.
 * @param {RuleContext} context The ESLint rule context object.
 * @param {ObjectExpression} node Node to check
 * @returns { VueObjectType | null } The Vue definition type.
 */
function getVueObjectType(context, node) {
  if (node.type !== 'ObjectExpression') {
    return null
  }

  const parent = getParent(node)

  if (parent.type === 'ExportDefaultDeclaration') {
    // export default {} in .mpx || .jsx
    const filePath = context.getFilename()
    if (
      isVueComponentFile(parent, filePath) &&
      skipTSAsExpression(parent.declaration) === node
    ) {
      return 'export'
    }
  } else if (parent.type === 'CallExpression') {
    // Vue.component('xxx', {}) || component('xxx', {})
    if (
      isVueComponent(parent) &&
      skipTSAsExpression(parent.arguments.slice(-1)[0]) === node
    ) {
      return 'definition'
    }
  } else if (parent.type === 'NewExpression') {
    // new Vue({})
    if (
      isVueInstance(parent) &&
      skipTSAsExpression(parent.arguments[0]) === node
    ) {
      return 'instance'
    }
  }
  if (
    getComponentComments(context).some(
      (el) => el.loc.end.line === node.loc.start.line - 1
    )
  ) {
    return 'mark'
  }
  return null
}

/**
 * Gets the component comments of a given context.
 * @param {RuleContext} context The ESLint rule context object.
 * @return {Token[]} The the component comments.
 */
function getComponentComments(context) {
  let tokens = componentComments.get(context)
  if (tokens) {
    return tokens
  }
  const sourceCode = context.getSourceCode()
  tokens = sourceCode
    .getAllComments()
    .filter((comment) => /@vue\/component/g.test(comment.value))
  componentComments.set(context, tokens)
  return tokens
}

/**
 * Get all props from component options object.
 * @param {ObjectExpression} componentObject Object with component definition
 * @return {(ComponentArrayProp | ComponentObjectProp | ComponentUnknownProp)[]} Array of component props
 */
function getComponentPropsFromOptions(componentObject) {
  const propsNode = componentObject.properties.find(
    /**
     * @param {ESNode} p
     * @returns {p is (Property & { key: Identifier & {name: 'props'} })}
     */
    (p) => p.type === 'Property' && getStaticPropertyName(p) === 'props'
  )

  if (!propsNode) {
    return []
  }
  if (
    propsNode.value.type !== 'ObjectExpression' &&
    propsNode.value.type !== 'ArrayExpression'
  ) {
    return [
      {
        type: 'unknown',
        key: null,
        propName: null,
        value: null,
        node: propsNode.value
      }
    ]
  }

  return getComponentPropsFromDefine(propsNode.value)
}

/**
 * Get all props by looking at all component's properties
 * @param {ObjectExpression|ArrayExpression} propsNode Object with props definition
 * @return {(ComponentArrayProp | ComponentObjectProp | ComponentUnknownProp)[]} Array of component props
 */
function getComponentPropsFromDefine(propsNode) {
  if (propsNode.type === 'ObjectExpression') {
    return propsNode.properties.map((prop) => {
      if (!isProperty(prop)) {
        return {
          type: 'unknown',
          key: null,
          propName: null,
          value: null,
          node: prop
        }
      }
      const propName = getStaticPropertyName(prop)
      if (propName != null) {
        return {
          type: 'object',
          key: prop.key,
          propName,
          value: skipTSAsExpression(prop.value),
          node: prop
        }
      }
      return {
        type: 'object',
        key: null,
        propName: null,
        value: skipTSAsExpression(prop.value),
        node: prop
      }
    })
  }

  return propsNode.elements.filter(isDef).map((prop) => {
    if (prop.type === 'Literal' || prop.type === 'TemplateLiteral') {
      const propName = getStringLiteralValue(prop)
      if (propName != null) {
        return {
          type: 'array',
          key: prop,
          propName,
          value: null,
          node: prop
        }
      }
    }
    return {
      type: 'array',
      key: null,
      propName: null,
      value: null,
      node: prop
    }
  })
}
