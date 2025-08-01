/**
 * @fileoverview Don't introduce side effects in computed properties
 * @author Michał Sajnóg
 */
'use strict'

const utils = require('../utils')

/**
 * @typedef {import('../utils').MpxObjectData} MpxObjectData
 * @typedef {import('../utils').ComponentComputedProperty} ComponentComputedProperty
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow side effects in computed properties',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-side-effects-in-computed-properties.html'
    },
    fixable: null,
    schema: [],
    messages: {
      property: 'Unexpected side effect in "{{key}}" computed property.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    /** @type {Map<ObjectExpression, ComponentComputedProperty[]>} */
    const computedPropertiesMap = new Map()

    /**
     * @typedef {object} ScopeStack
     * @property {ScopeStack | null} upper
     * @property {BlockStatement | Expression | null} body
     */
    /**
     * @type {ScopeStack | null}
     */
    let scopeStack = null

    /** @param {FunctionExpression | ArrowFunctionExpression | FunctionDeclaration} node */
    function onFunctionEnter(node) {
      scopeStack = {
        upper: scopeStack,
        body: node.body
      }
    }

    function onFunctionExit() {
      scopeStack = scopeStack && scopeStack.upper
    }

    return utils.defineMpxVisitor(context, {
      onMpxObjectEnter(node) {
        computedPropertiesMap.set(node, utils.getComputedProperties(node))
      },
      ':function': onFunctionEnter,
      ':function:exit': onFunctionExit,

      /**
       * @param {(Identifier | ThisExpression) & {parent: MemberExpression}} node
       * @param {MpxObjectData} data
       */
      'MemberExpression > :matches(Identifier, ThisExpression)'(
        node,
        { node: vueNode }
      ) {
        if (!scopeStack) {
          return
        }
        const targetBody = scopeStack.body
        const computedProperty = /** @type {ComponentComputedProperty[]} */ (
          computedPropertiesMap.get(vueNode)
        ).find(
          (cp) =>
            cp.value &&
            node.loc.start.line >= cp.value.loc.start.line &&
            node.loc.end.line <= cp.value.loc.end.line &&
            targetBody === cp.value
        )
        if (!computedProperty) {
          return
        }

        if (!utils.isThis(node, context)) {
          return
        }
        const mem = node.parent
        if (mem.object !== node) {
          return
        }

        const invalid = utils.findMutating(mem)
        if (invalid) {
          context.report({
            node: invalid.node,
            messageId: 'property',
            data: { key: computedProperty.key || 'Unknown' }
          })
        }
      }
    })
  }
}
