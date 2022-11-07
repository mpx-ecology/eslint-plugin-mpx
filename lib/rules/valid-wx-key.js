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
      description: 'enforce valid `wx:key` directives',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-key.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VAttribute[directive=true][key.name.name='key']"(node) {
        const element = node.parent.parent
        if (!utils.hasDirective(element, 'for')) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'wx:key' and 'wx:for' directives need exist on the same element. You may add 'wx:for' directives."
          })
        }
        if (node.key.argument) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:key' directives require no argument."
          })
        }
        if (node.key.modifiers.length > 0) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:key' directives require no modifier."
          })
        }
        if (!node.value || utils.isEmptyValueDirective(node, context)) {
          return context.report({
            node,
            loc: node.loc,
            message: "'wx:key' directives require that attribute value."
          })
        }
        const value = node.value
        const text = sourceCode.getText(node.value)
        if (value.expression) {
          let error = false
          // 有效值 & 有花括号
          if (/\{\{(\S)*\}\}/.test(text)) {
            error = true
          }
          // 非单纯的字符串
          if (!(value.expression.name || value.expression.raw)) {
            error = true
          }
          if (error) {
            const result =
              value.expression.name ||
              value.expression.raw ||
              (value.expression.property && value.expression.property.name)
            if (result) {
              context.report({
                node,
                loc: node.loc,
                message: `'wx:key' does not look like a valid key name (Did you mean 'wx:key="{{result}}"' ?).`,
                data: {
                  result
                }
              })
            } else {
              context.report({
                node,
                loc: node.loc,
                message: "'wx:key' does not look like a valid key name."
              })
            }
          }
        } else if (!/^[\"|\']?(\*this)[\"|\']?$/.test(text)) {
          // *this ok
          context.report({
            node,
            loc: node.loc,
            message: "'wx:key' does not look like a valid key name."
          })
        }
        // *this/{{}}
        // if (!node.expression) {
        //   const value = sourceCode.getText(node.value)
        // {{id}}
        //   if (/^\{\{(\S)*\}\}$/.test(value)) {
        //     context.report({
        //       node,
        //       loc: node.loc,
        //       message: `'wx:key' directives require static string without '{{}}' in attribute value (Did you mean 'wx:key="{{expressionValue}}"' ?).`,
        //       data: {
        //         expressionValue: node.value.expression.name
        //       }
        //     })
        //   } else if (value !== '*this') {
        //     context.report({
        //       node,
        //       loc: node.loc,
        //       message: "'wx:key' does not look like a valid key name."
        //     })
        //   }
        // }
      }
    })
  }
}
