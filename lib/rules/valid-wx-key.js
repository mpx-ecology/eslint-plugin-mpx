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
// const report
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `wx:key` directives',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-key.html'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          keywords: {
            type: 'array'
          }
        }
      }
    ]
  },
  /** @param {RuleContext} context */
  create(context) {
    const options = context.options[0] || {}
    const reservedKeywords =
      options.keywords instanceof Array ? options.keywords : ['this', 'index']
    const keywordError = reservedKeywords
      .map((/** @type {string} */ item) => item && `"${item}"`)
      .filter((/** @type {string | Boolean} */ item) => item)
      .join(' or ')
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
        const nodeValue = node.value
        const text = sourceCode.getText(nodeValue)
        const textValue = text.replace(/^(['|"])(.*)\1$/, (...arr) => arr[2])
        // 是保留关键字
        if (reservedKeywords.includes(textValue)) {
          context.report({
            node,
            loc: node.loc,
            message: `'wx:key={{text}}' does not look like a valid key name (Do not use attributes {{keywordError}}. Add ignore If necessary).`,
            data: {
              text,
              keywordError
            }
          })
        }
        // 是正常变量名 或为*this 不报错
        if (/^[\da-zA-Z_$]*$/.test(textValue) || textValue === '*this') return
        let resultFlag = 0
        // 有花括号
        if (/\{{2}(.)+\}{2}/.test(text)) {
          resultFlag = 1
          context.report({
            node,
            loc: node.loc,
            message: `'wx:key={{text}}' required static property.`,
            data: {
              text
            }
          })
        }
        // 有对象属性
        if (
          nodeValue.expression &&
          nodeValue.expression.type === 'MemberExpression'
        ) {
          resultFlag = 1
          context.report({
            node,
            loc: node.loc,
            message: `'wx:key={{text}}' does not look like a valid key name (Did you mean 'wx:key="{{result}}"' ?).`,
            data: {
              text,
              result:
                nodeValue.expression.property &&
                // @ts-ignore
                nodeValue.expression.property.name
            }
          })
        }
        // 其他错误(如特殊字符)
        if (!resultFlag) {
          context.report({
            node,
            loc: node.loc,
            message: "'wx:key={{text}}' does not look like a valid key name.",
            data: {
              text
            }
          })
        }
      },
      "VAttribute[directive=true][key.name.name='for']"(node) {
        const element = node.parent.parent
        if (!utils.hasDirective(element, 'key')) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'wx:for' require 'wx:key' directives on the same element. You may add 'wx:key' directives."
          })
        }
      }
    })
  }
}
