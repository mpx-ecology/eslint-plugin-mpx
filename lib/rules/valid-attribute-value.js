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
      description: 'enforce valid valid-attribute-value',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-attribute-value.html'
    },
    fixable: null,
    schema: [],
    messages: {
      requireValue: "'{{value}}' attribute expression require valid value.",
      requireAttribute: "'{{value}}' directive require that attribute value."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VAttribute | VDirective} node */
      VAttribute: (node) => {
        // 解析取值
        const value = node.value
        const text = value && sourceCode.getText(value)
        // 判断{{}}表达式是否为空 或者不含数字、字母、下滑线等奇怪的值
        if (text && /\{\{(\s|[^\w])*\}\}/.test(text)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'requireValue',
            data: {
              value: sourceCode.getText(node)
            }
          })
        } else if (node.directive) {
          // 若为指令，继续判断是否为空值
          const isEmpty = utils.isEmptyValueDirective(node, context)
          if (isEmpty) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'requireAttribute',
              data: {
                value: sourceCode.getText(node)
              }
            })
          }
        }
      }
    })
  }
}
