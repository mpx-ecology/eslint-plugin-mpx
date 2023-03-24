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
      description: 'mpx.create*调用方式已经被废弃',
      categories: ['composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-deprecated-mpx-createfunction'
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
          node.expression.callee &&
          node.expression.callee.object &&
          node.expression.callee.object.name === 'mpx' &&
          node.expression.callee.property &&
          [
            'createApp',
            'createStore',
            'createPage',
            'createComponent'
          ].includes(node.expression.callee.property.name)
        ) {
          context.report({
            node,
            message:
              'The Mpx object of default export is no longer attached to the {{name}} runtime method.',
            data: { name: node.expression.callee.property.name }
          })
        }
      }
    }
  }
}
