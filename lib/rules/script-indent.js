/**
 * @author lishuaishuai
 */
'use strict'

const indentCommon = require('../utils/indent-common')

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'enforce consistent indentation in `<script>`',
      categories: undefined,
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/script-indent.html'
    },
    // eslint-disable-next-line eslint-plugin/require-meta-fixable
    fixable: 'whitespace',
    schema: [
      {
        anyOf: [{ type: 'integer', minimum: 1 }, { enum: ['tab'] }]
      },
      {
        type: 'object',
        properties: {
          baseIndent: { type: 'integer', minimum: 0 },
          switchCase: { type: 'integer', minimum: 0 },
          ignores: {
            type: 'array',
            items: {
              allOf: [
                { type: 'string' },
                { not: { type: 'string', pattern: ':exit$' } },
                { not: { type: 'string', pattern: String.raw`^\s*$` } }
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        },
        additionalProperties: false
      }
    ],
    // eslint-disable-next-line eslint-plugin/prefer-message-ids
    messages: {}
  },
  /** @param {RuleContext} context */
  create(context) {
    return indentCommon.defineVisitor(context, context.getSourceCode(), {})
  }
}
