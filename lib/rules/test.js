'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `test` directives',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/test.html'
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: '{{key}}34'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name.name='if']"(node) {
        if (!node.value || !node.value.expression) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'unexpected',
            data: {
              key: 12
            }
          })
        }
      },
      "VElement[name='button']"(node) {
        console.log(node.children[0], 'node.children[0]')
        if (node.children[0] && node.children[0].value === 'test') {
          context.report({
            node,
            loc: node.loc,
            message: '5678',
            fix(fixer) {
              return fixer.replaceText(node.children[0], 'test-->mpx')
            }
          })
        }
      }
    })
  }
}
