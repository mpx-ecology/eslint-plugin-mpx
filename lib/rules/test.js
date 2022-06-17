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
      categories: [''],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-if.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.executeOnVue(context, (obj) => {
      console.log(obj)
    })
    return utils.defineTemplateBodyVisitor(context, {
        /** @param {VDirective} node */
        "VElement[name='input']"(node) {
          // console.log(utils.hasAttribute(node, 'class', 'b'))
          // console.log(utils.hasDirective(node, 'if'))
          // console.log(utils.getAttribute(node, 'class', 'b'))
        },
        'VAttribute[directive=true]'(node) {
          // console.log(node)
          // console.log(utils.hasDirective(node.parent.parent, 'if', 'a'))
          // console.log(utils.isEmptyValueDirective(node, context))
          // console.log(utils.isEmptyExpressionValueDirective(node, context))
        }
      },
      {
        'MemberExpression > ThisExpression'(node) {
          context.report({
            node,
            message: 'test'
          })
        },
        'Property'(node) {
          // console.log(node)
          // console.log(utils.getStaticPropertyName(node))
        },
        ObjectExpression(node) {
          // console.log(utils.getComponentPropsFromOptions(node)) 
          // console.log(utils.getComputedProperties(node))
        },
        'Literal'(node) {
          // console.log(node)
          // console.log(utils.getStringLiteralValue(node))
        }
      }
    )
  }
}
