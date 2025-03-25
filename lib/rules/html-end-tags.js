/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
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
    type: 'suggestion',
    docs: {
      description: 'enforce end tag style',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/html-end-tags.html'
    },
    fixable: 'code',
    schema: [],
    messages: {
      endTag: "'<{{name}}>' should have end tag."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node) {
          if (hasInvalidEOF) {
            return
          }

          const name = node.name
          // 小程序没有这种标签，不需要这种判断
          // const isVoid = utils.isHtmlVoidElementName(name)
          const isSelfClosing = node.startTag.selfClosing
          const hasEndTag = node.endTag != null

          if (!hasEndTag && !isSelfClosing) {
            context.report({
              node: node.startTag,
              loc: node.startTag.loc,
              messageId: 'endTag',
              data: { name },
              fix: (fixer) => fixer.insertTextAfter(node, `</${name}>`)
            })
          }
        }
      },
      {
        Program(node) {
          hasInvalidEOF = utils.hasInvalidEOF(node)
        }
      }
    )
  }
}
