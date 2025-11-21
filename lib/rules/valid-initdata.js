// @ts-nocheck
/**
 * @fileoverview initData检测
 * @author jvzuojing
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const utils = require('../utils')
function commonFunction(value, list) {
  const props = value.properties
  for (const item of props) {
    if (
      item.type === 'SpreadElement' &&
      item.argument &&
      item.argument.arguments
    ) {
      let args = []
      if (item.argument.arguments[0]) {
        if (item.argument.arguments[0].elements) {
          args = item.argument.arguments[0].elements
        }
      } else {
        if (item.argument.arguments.arguments) {
          const elements = item.argument.arguments.arguments.elements
          if (elements) {
            for (const row of elements) {
              if (row.type === 'ArrayExpression') {
                args = row.elements
              }
            }
          }
        }
      }
      for (const item of args) {
        list.add(item.value)
      }
    } else if (item.key) {
      list.add(item.key.name)
    }
  }
}
function handleInitData(current, propsSet, parentName) {
  for (const item of current) {
    const currentName = item.key.name
    if (currentName) {
      let name = currentName
      if (parentName) {
        name = `${parentName}.${currentName}`
      }
      propsSet.add(name)
    }
    if (item.value.type === 'ObjectExpression' && item.value.properties) {
      let pre = currentName
      if (parentName) {
        pre = `${parentName}.${currentName}`
      }
      handleInitData(item.value.properties, propsSet, pre)
    }
  }
}

function checkInInitData(
  computedSet,
  propsSet,
  context,
  node,
  nodeName,
  hasInitData
) {
  if (hasInitData === 1 && nodeName) {
    // 属性值存在 || 说明有兜底，跳过检测
    if (nodeName.includes('||')) return
    // 检测当前属性值在initData 和 computedSet 导出情况，computedSet 返回不会解构出来，做一个兼容
    if (!propsSet.has(nodeName) && computedSet.has(nodeName.split('.')[0])) {
      context.report({
        node,
        messageId: 'unexpected',
        data: {
          name: nodeName
        }
      })
    }
  }
}
function checkInitData(
  computedSet,
  propsSet,
  hasInitData,
  context,
  node,
  nodeName
) {
  if (
    computedSet.has(nodeName) &&
    !propsSet.has(nodeName) &&
    hasInitData === 2
  ) {
    context.report({
      node,
      messageId: 'missingValue',
      data: {
        name: nodeName
      }
    })
  }
}
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'require initData检测',
      recommended: false,
      categories: ['mpx-essential', 'composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-initdata.html' // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      missingValue:
        "Missing 'initData' but the data {{name}} used for property.",
      unexpected:
        "The data '{{name}}' isn't expose in initData but used for property."
    }
  },
  create(context) {
    // 收集一下initData的属性
    const propsSet = new Set([])
    // 收集computed属性
    const computedSet = new Set([])
    // 忽略的标签类型
    const ignoreElementTypes = new Set([
      'view',
      'text',
      'image',
      'audio',
      'video',
      'button',
      'input',
      'navigator',
      'icon',
      'picker',
      'picker-item',
      'block',
      'scroll-view',
      'swiper',
      'swiper-item',
      'label',
      'form',
      'checkbox',
      'checkbox-group',
      'radio',
      'radio-group',
      'switch'
    ])
    const ignoreAttributeTypes = new Set([
      'wx:if',
      'wx:else',
      'bindtap',
      'catchtap',
      'wx:for',
      'wx:ref',
      'wx:key',
      'wx:for-item',
      'class',
      'style',
      'hover-class',
      'src'
    ])
    // 全局是否有initData 初始值：0 ，存在： 1，不存在： 2
    let hasInitData = 0
    return utils.defineTemplateBodyVisitor(
      context,
      {
        // VExpressionContainer(node) {},
        VAttribute(node) {
          const parent = node.parent
          if (!ignoreElementTypes.has(parent.name)) {
            const isattr =
              !ignoreAttributeTypes.has(node.key.name) &&
              node.value &&
              node.value.value &&
              node.value.value.startsWith('{{')
            if (isattr) {
              const reg = /(?<={{).*?(?=}})/
              checkInInitData(
                computedSet,
                propsSet,
                context,
                node,
                node.value.value.match(reg)[0],
                hasInitData
              )
              checkInitData(
                computedSet,
                propsSet,
                hasInitData,
                context,
                node,
                node.value.value.match(reg)[0]
              )
            }
          }
        }
      },
      {
        Program(node) {
          if (!utils.isScriptSetup(context)) return
          const body = node.body
          if (body) {
            for (const item of body) {
              if (
                item.type === 'ExpressionStatement' &&
                item.expression &&
                item.expression.type === 'CallExpression' &&
                item.expression.callee.name === 'defineOptions' &&
                item.expression.arguments
              ) {
                for (const sub of item.expression.arguments) {
                  if (sub.type === 'ObjectExpression' && sub.properties) {
                    for (const val of sub.properties) {
                      if (val.key.name === 'initData') {
                        hasInitData = 1
                      }
                    }
                  }
                }
                if (hasInitData === 0) {
                  hasInitData = 2
                }
              } else {
                if (hasInitData === 0) {
                  hasInitData = 2
                }
              }
            }
          }
        },
        CallExpression(node) {
          if (utils.isScriptSetup(context)) {
            // setup 直接收集 defineExpose 的值
            if (node.callee.name === 'defineExpose') {
              commonFunction(node.arguments[0], computedSet)
            }
          } else {
            if (node.callee.name !== 'createComponent') return
            const properties = node.arguments[0].properties
            if (!properties) return
            for (const element of properties) {
              if (element.key.name === 'initData') {
                hasInitData = 1
              }
            }
            if (hasInitData === 0) {
              hasInitData = 2
            }
          }
        },
        ObjectExpression(node) {
          const parent = node.parent
          const isinit =
            parent &&
            parent.type === 'CallExpression' &&
            parent.callee.name === 'defineOptions' &&
            node.properties &&
            Array.isArray(node.properties)
          if (isinit) {
            for (const item of node.properties) {
              if (item.key.name === 'initData') {
                handleInitData(item.value.properties, propsSet)
              }
            }
          }
        },
        Property(node) {
          if (node.key.name === 'computed') {
            commonFunction(node.value, computedSet)
          }
          if (node.key.name === 'initData') {
            const isCreate =
              node.parent.parent.callee &&
              node.parent.parent.callee.name === 'createComponent'
            if (isCreate) {
              handleInitData(node.value.properties, propsSet)
            }
          }
        }
      }
    )
  }
}
