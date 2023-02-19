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
      description: 'enforce valid valid-template-quote',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-template-quote.html'
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
    const getCharExp = (/** @type {string} */ char) =>
      new RegExp(`^([${char}])(.*)\\1$`)
    const characterText = isSingle ? 'single' : 'double'
    const quoteExp = [
      getCharExp(character), // 校验是否由字符开头和结尾
      getCharExp(isSingle ? '"`' : "'`") // 匹配需要替换的字符
    ]
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VAttribute | VDirective} node */
      VAttribute: (node) => {
        // 解析取值
        const value = node.value
        const text = value && sourceCode.getText(value)
        // 判断引号 如果不是双引号开头 且内部无对应引号
        if (text && !quoteExp[0].test(text) && !text.includes(character)) {
          const mainValue = text.replace(
            // /^(['`])(.*?)\1$/g,
            quoteExp[1],
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
