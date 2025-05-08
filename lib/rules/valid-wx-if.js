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
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `wx:if` directives',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-if.html'
    },
    fixable: null,
    schema: [],
    messages: {
      same: "'wx:if' and 'wx:else' directives can't exist on the same element. You may want 'wx:elif' directives.",
      elsame:
        "'wx:if' and 'wx:elif' directives can't exist on the same element.",
      dirnoarg: "'wx:if' directives require no argument.",
      nomodifier: "'wx:if' directives require no modifier.",
      attrvalue: "'wx:if' directives require that attribute value."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='if']"(node) {
        const element = node.parent.parent

        if (utils.hasDirective(element, 'else')) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'same'
          })
        }
        if (utils.hasDirective(element, 'elif')) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'elsame'
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'dirnoarg'
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'nomodifier'
          })
        }
        if (!node.value || utils.isEmptyValueDirective(node, context)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'attrvalue'
          })
        }
      }
    })
  }
}
