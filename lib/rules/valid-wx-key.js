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
/**
 * 判断是否为key的保留关键字，如 this、index
 */
const Reservedkeywords = ['this', 'index']
const keywordError = Reservedkeywords.map((item) => `"${item}"`).join(' or ')
/**
 * @param {String} text
 */
function isReservedkeywords(text) {
  // text = text.replace(/\"|\'/g, '')
  return Reservedkeywords.includes(text)
}

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
        // 能正常解析值
        if (value.expression) {
          const expressionText = sourceCode.getText(value.expression)
          // 保留关键字
          if (isReservedkeywords(expressionText)) {
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
          // 有花括号 或 是对象属性
          else if (
            /\{\{(.)+\}\}/.test(text) ||
            value.expression.type === 'MemberExpression'
          ) {
            const result =
              // @ts-ignore
              value.expression.name ||
              // @ts-ignore
              (value.expression.property && value.expression.property.name)
            if (result) {
              context.report({
                node,
                loc: node.loc,
                message: `'wx:key={{text}}' does not look like a valid key name (Did you mean 'wx:key="{{result}}"' ?).`,
                data: {
                  text,
                  result
                }
              })
            } else {
              context.report({
                node,
                loc: node.loc,
                message:
                  "'wx:key={{text}}' does not look like a valid key name.",
                data: {
                  text
                }
              })
            }
          }
        } else if (!/^[\"|\']?(\*this)[\"|\']?$/.test(text)) {
          // 不能正常解析，除了*this 外都报错
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
