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
 * 校验是否是动态style并抛出错误
 * @param {string} text
 * @param {VAttribute} node
 * @param {RuleContext} context
 */
function reportStyle(text, node, context) {
  if (text && /\{\{(\S)*\}\}/.test(text)) {
    context.report({
      node,
      loc: node.loc,
      message:
        "'<swiper-item>' 动态样式建议在子节点上设置，否则数据变更时可能出现样式异常."
    })
  }
}
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
        node.value && reportStyle(sourceCode.getText(node.value), node, context)
      }
    })
  }
}
