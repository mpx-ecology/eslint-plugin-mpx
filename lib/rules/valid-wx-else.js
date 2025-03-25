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
      description: 'enforce valid `wx:else` directives',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-else.html'
    },
    fixable: null,
    schema: [],
    messages: {
      preceded:
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive.",
      exist:
        "'wx:else' and 'wx:if' directives can't exist on the same element. You may want 'wx:elif' directives.",
      elexist:
        "'wx:else' and 'wx:elif' directives can't exist on the same element.",
      requirenoarg: "'wx:else' directives require no argument.",
      requirenomodifier: "'wx:else' directives require no modifier.",
      requirenoattr: "'wx:else' directives require no attribute value."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='else']"(node) {
        const element = node.parent.parent

        if (!utils.prevElementHasIf(element)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'preceded'
          })
        }
        if (utils.hasDirective(element, 'if')) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'exist'
          })
        }
        if (utils.hasDirective(element, 'elif')) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'elexist'
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'requirenoarg'
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'requirenomodifier'
          })
        }
        if (node.value) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'requirenoattr'
          })
        }
      }
    })
  }
}
