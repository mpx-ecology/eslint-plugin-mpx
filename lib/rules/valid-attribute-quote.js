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
      description: 'enforce valid valid-attribute-quote',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-attribute-quote.html'
    },
    fixable: 'code',
    schema: [
      {
        enum: [0, 1, 'single', 'double']
      }
    ]
  },
  /** @param {RuleContext} context */
  create(context) {
    const isSingle = [1, 'single'].includes(context.options[0])
    const character = isSingle ? "'" : '"'
    const characterText = isSingle ? 'single' : 'double'
    const quoteExp = [
      new RegExp(`(^${character}(.|\n)*"$)`), // 校验是否由字符开头和结尾
      new RegExp(character), // 校验内部是否有字符
      new RegExp(`^([${isSingle ? '"' : "'"}\`])` + `(.*?)\\1$`)
      // new RegExp('^(['+isSingle ? '"' : "'"+ '`])(.*?)\1$/g'),
    ]
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VAttribute | VDirective} node */
      VAttribute: (node) => {
        // 解析取值
        const value = node.value
        const text = value && sourceCode.getText(value)
        // 判断引号 如果不是双引号开头 且内部无引号
        if (text && !quoteExp[0].test(text) && !quoteExp[1].test(text)) {
          const mainValue = text.replace(
            // /^(['`])(.*?)\1$/g,
            quoteExp[2],
            (...item) => item[2]
          )
          const fixText = character + mainValue + character
          context.report({
            node,
            loc: node.loc,
            message:
              '`{{value}}` attribute value require {{characterText}} quotes.',
            data: {
              value: sourceCode.getText(node),
              characterText
            },
            fix: (fixer) => node.value && fixer.replaceText(node.value, fixText)
          })
        }
      }
    })
  }
}
