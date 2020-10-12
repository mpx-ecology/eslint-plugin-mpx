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
      description: 'enforce valid `wx:elif` directives',
      categories: ['vue3-essential', 'essential'],
      url: 'https://eslint.vuejs.org/rules/valid-wx:elif.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='elif']"(node) {
        const element = node.parent.parent

        if (!utils.prevElementHasIf(element)) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
          })
        }
        if (utils.hasDirective(element, 'if')) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'wx:elif' and 'wx:if' directives can't exist on the same element."
          })
        }
        if (utils.hasDirective(element, 'else')) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'wx:elif' and 'wx:else' directives can't exist on the same element."
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:elif' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:elif' directives require no modifier."
          })
        }
        if (!node.value || utils.isEmptyValueDirective(node, context)) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:elif' directives require that attribute value."
          })
        }
      }
    })
  }
}
