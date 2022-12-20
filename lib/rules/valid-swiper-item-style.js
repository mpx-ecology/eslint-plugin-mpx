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
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '<swiper-item>: 建议在子节点上设置样式',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-swiper-item-style.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    const sourceCode = context.getSourceCode()
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VAttribute} node */
      // "VElement[name='swiper-item'] :matches(VAttribute[key.name='style'],  VAttribute[directive=true][key.name.name='style'])"

      "VAttribute:matches([directive=true][key.name.name='style'],[key.name='style'])[parent.parent.name='swiper-item']"(
        node
      ) {
        // 校验值是否是动态style
        if (
          node.value &&
          /\{\{(\S)*\}\}/.test(sourceCode.getText(node.value))
        ) {
          context.report({
            node: node.value,
            loc: node.value.loc,
            message:
              "'<swiper-item>' 动态样式建议在子节点上设置，否则数据变更时可能出现样式异常."
          })
        }
      }
    })
  }
}
