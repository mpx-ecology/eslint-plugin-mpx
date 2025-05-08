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
// 强制component 有一个range范围
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'require 强制 component 添加 range 范围',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-component-range.html'
    },
    fixable: null,
    schema: [],
    messages: {
      elementRequire: "'component' element require 'is' attribute.",
      elementRange: "'component' element require 'range' for backup.",
      elementScope:
        "'component' element require 'range' attribute to set the scope.",
      componentRequire: "'component' attribute '{{key}}' require valid value."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    // const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VElement} node */
      "VElement[name='component']"(node) {
        const isNode = utils.getAttribute(node, 'is')
        const rangeNode = utils.getAttributeAll(node, /^range(@[\w-|:]+)?$/)
        if (!isNode) {
          return context.report({
            node,
            loc: node.loc,
            messageId: 'elementRequire'
          })
        } else if (rangeNode.length > 0) {
          // 最好有个兜底range
          if (!utils.getAttribute(node, 'range')) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'elementRange'
            })
          }
        } else {
          context.report({
            node,
            loc: node.loc,
            messageId: 'elementScope'
          })
        }
        for (const keyNode of [isNode, ...rangeNode]) {
          if (keyNode && (!keyNode.value || !keyNode.value.value)) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'componentRequire',
              data: {
                key: keyNode.key.name
              }
            })
          }
        }
      }
    })
  }
}
