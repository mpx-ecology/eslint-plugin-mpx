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
      description: 'watch第二个参数统一为函数，不再提供对象',
      categories: ['composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-deprecated-watch-second-param'
    },
    fixable: 'code',
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    return {
      /** @param {import("mpx-eslint-parser/ast").ESLintStatement} node */
      ExpressionStatement(node) {
        if (
          node.expression?.type === 'CallExpression' &&
          node.expression?.callee?.name === 'watch' &&
          node.expression?.arguments?.[1]?.type === 'ObjectExpression'
        ) {
          context.report({
            node,
            message:
              'The watch API no longer accepts the second parameter as an object with the handler attribute.'
          })
        }
      }
    }
  }
}
