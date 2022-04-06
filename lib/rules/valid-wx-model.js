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

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/** @type {RuleModule}  */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `wx:model` directives',
      // categories: ['mpx-essential'],
      url: 'https://eslint.vuejs.org/rules/valid-wx:model.html'
    },
    fixable: null,
    schema: [],
    messages: {
      unexpectedInvalidElement:
        "'wx:model' directives aren't supported on <{{name}}> elements.",
      unexpectedArgument: "'wx:model' directives require no argument.",
      unexpectedModifier:
        "'wx:model' directives don't support the modifier '{{name}}', try use wx:model-filter.",
      missingValue: "'wx:model' directives require that attribute value."
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
            context.report({
              node,
              loc: node.loc,
              messageId: 'unexpectedModifier',
              data: { name: modifier.name }
            })
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
      }
    })
  }
}
