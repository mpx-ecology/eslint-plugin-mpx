/**
 * @author pagnkelly
 * @copyright 2020 pagnkelly. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const VALID_MODIFIERS = new Set(['lazy', 'number', 'trim'])

/**
 * Check whether the given node is valid or not.
 * @param {VElement} node The element node to check.
 * @returns {boolean} `true` if the node is valid.
 */
function isValidElement(node) {
  const name = node.name
  return (
    name === 'input' || name === 'textarea' || utils.isCustomComponent(node)
  )
}

/**
 * Check whether the given node is a MemberExpression containing an optional chaining.
 * e.g.
 * - `a?.b`
 * - `a?.b.c`
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node is a MemberExpression containing an optional chaining.
 */
function isOptionalChainingMemberExpression(node) {
  return (
    node.type === 'ChainExpression' &&
    node.expression.type === 'MemberExpression'
  )
}

/**
 * Check whether the given node can be LHS (left-hand side).
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node can be LHS.
 */
function isLhs(node) {
  return node.type === 'Identifier' || node.type === 'MemberExpression'
}

/**
 * Check whether the given node is a MemberExpression of a possibly null object.
 * e.g.
 * - `(a?.b).c`
 * - `(null).foo`
 * @param {ASTNode} node The node to check.
 * @returns {boolean} `true` if the node is a MemberExpression of a possibly null object.
 */
function maybeNullObjectMemberExpression(node) {
  if (node.type !== 'MemberExpression') {
    return false
  }
  const { object } = node
  if (object.type === 'ChainExpression') {
    // `(a?.b).c`
    return true
  }
  if (object.type === 'Literal' && object.value === null && !object.bigint) {
    // `(null).foo`
    return true
  }
  if (object.type === 'MemberExpression') {
    return maybeNullObjectMemberExpression(object)
  }
  return false
}

/**
 * Get the variable by names.
 * @param {string} name The variable name to find.
 * @param {VElement} leafNode The node to look up.
 * @returns {VVariable|null} The found variable or null.
 */
function getVariable(name, leafNode) {
  let node = leafNode

  while (node != null) {
    const variables = node.variables
    const variable = variables && variables.find((v) => v.id.name === name)

    if (variable != null) {
      return variable
    }

    if (node.parent.type === 'VDocumentFragment') {
      break
    }

    node = node.parent
  }

  return null
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/** @type {RuleModule}  */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `wx:model` directives',
      categories: ['vue3-essential', 'essential'],
      url: 'https://eslint.vuejs.org/rules/valid-wx:model.html'
    },
    fixable: null,
    schema: [],
    messages: {
      unexpectedInvalidElement:
        "'wx:model' directives aren't supported on <{{name}}> elements.",
      unexpectedArgument: "'wx:model' directives require no argument.",
      unexpectedModifier:
        "'wx:model' directives don't support the modifier '{{name}}'.",
      missingValue: "'wx:model' directives require that attribute value.",
      unexpectedOptionalChaining:
        "Optional chaining cannot appear in 'wx:model' directives.",
      unexpectedNonLhsExpression:
        "'wx:model' directives require the attribute value which is valid as LHS.",
      unexpectedNullObject:
        "'wx:model' directive has potential null object property access.",
      unexpectedUpdateIterationVariable:
        "'wx:model' directives cannot update the iteration variable '{{varName}}' itself."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='model']"(node) {
        const element = node.parent.parent
        const name = element.name
        // 不是input textera 自定义组件则报错 比如view
        if (!isValidElement(element)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'unexpectedInvalidElement',
            data: { name }
          })
        }
        // :a .a 非 trim lazy number
        if (!utils.isCustomComponent(element)) {
          if (node.key.argument) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'unexpectedArgument'
            })
          }

          for (const modifier of node.key.modifiers) {
            if (!VALID_MODIFIERS.has(modifier.name)) {
              context.report({
                node,
                loc: node.loc,
                messageId: 'unexpectedModifier',
                data: { name: modifier.name }
              })
            }
          }
        }
        // 无值
        if (!node.value || utils.isEmptyValueDirective(node, context)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'missingValue'
          })
          return
        }
        const expression = node.value.expression
        if (!expression) {
          // Parsing error
          return
        }
        if (isOptionalChainingMemberExpression(expression)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'unexpectedOptionalChaining'
          })
        } else if (!isLhs(expression)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'unexpectedNonLhsExpression'
          })
        } else if (maybeNullObjectMemberExpression(expression)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'unexpectedNullObject'
          })
        }

        for (const reference of node.value.references) {
          const id = reference.id
          if (id.parent.type !== 'VExpressionContainer') {
            continue
          }

          const variable = getVariable(id.name, element)
          if (variable != null) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'unexpectedUpdateIterationVariable',

              data: { varName: id.name }
            })
          }
        }
      }
    })
  }
}