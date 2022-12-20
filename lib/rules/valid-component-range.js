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
      description: '强制 component 添加 range 范围',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-component-range.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    // const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VElement} node */
      "VElement[name='component']"(node) {
        if (!utils.hasAttribute(node, 'is')) {
          context.report({
            node,
            loc: node.loc,
            message: "'component' element require 'is' attribute."
          })
        } else if (!utils.hasAttribute(node, 'range')) {
          context.report({
            node,
            loc: node.loc,
            message:
              "'component' element require 'range' attribute to set the scope."
          })
        }
        // 暂时不判空了
        // [isNode, rangeNode].forEach((keyNode) => {
        //   if (keyNode && utils.isEmptyValueDirective(keyNode, context)) {
        //     context.report({
        //       node,
        //       loc: node.loc,
        //       message: "'component' attribute '{{key}}' require valid value.",
        //       data: {
        //         key: keyNode.key.name
        //       }
        //     })
        //   }
        // })
      }
    })
  }
}
