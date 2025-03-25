// @ts-nocheck
/**
 * @author pagnkelly
 * See LICENSE file in root directory for full license.
 */
'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'require watch第二个参数统一为函数，不再提供对象',
      categories: ['composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-deprecated-watch-second-param.html'
    },
    fixable: null,
    schema: [],
    messages: {
      attribute:
        'The watch API no longer accepts the second parameter as an object with the handler attribute.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return {
      /** @param {import("mpx-eslint-parser/ast").ESLintStatement} node */
      ExpressionStatement(node) {
        if (
          node.expression &&
          node.expression.type === 'CallExpression' &&
          node.expression.callee.name === 'watch' &&
          node.expression.arguments[1] &&
          node.expression.arguments[1].type === 'ObjectExpression'
        ) {
          context.report({
            node,
            messageId: 'attribute'
          })
        }
      }
    }
  }
}
