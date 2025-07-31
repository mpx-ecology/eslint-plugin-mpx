/**
 * @author pagnkelly
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')
// const casing = require('../utils/casing')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
/**
 * @param {SpreadElement} node - 展开节点
 * @param {Set<String>} exposeSet 存储定义的expose变量
 */
function handleSpreadElement(node, exposeSet) {
  // @ts-ignore
  for (const arg of node.argument.arguments) {
    if (arg.type === 'ArrayExpression') {
      for (const el of arg.elements) {
        exposeSet.add(el.value)
      }
    }
  }
}

/**
 * @param {(Property| SpreadElement)[]} properties - 展开节点
 * @param {Set<String>} exposeSet 存储定义的expose变量
 * @param {Object} scriptVariableNames 用于解析定义的展开的expose变量
 */
function handleProperties(properties, exposeSet, scriptVariableNames) {
  for (const prop of properties) {
    // defineExpose({a:1})
    if (prop.type === 'Property') {
      // @ts-ignore
      exposeSet.add(prop.key.name)
    } else if (
      prop.type === 'SpreadElement' &&
      prop.argument.type === 'CallExpression' &&
      prop.argument.arguments
    ) {
      // ...store.mapState
      handleSpreadElement(prop, exposeSet)
    } else if (
      prop.type === 'SpreadElement' &&
      prop.argument.type === 'Identifier' &&
      // @ts-ignore
      scriptVariableNames[prop.argument.name]
    ) {
      // defineExpose(...a)
      // @ts-ignore
      const props = scriptVariableNames[prop.argument.name]
      for (const p of props) {
        exposeSet.add(p.key.name)
      }
    }
  }
}
/**
 * @param {String} name - 展开节点
 * @param {Set<String>} exposeSet 存储定义的expose变量
 * @param {any} scriptVariableNames 用于解析定义的展开的expose变量
 */
function handleIdentifier(name, exposeSet, scriptVariableNames) {
  const props = scriptVariableNames[name]
  if (props) {
    for (const p of props) {
      exposeSet.add(p.key.name)
    }
  }
}
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'prevent `<script setup>` variables used in `<template>` to be marked as unused', // eslint-disable-line eslint-plugin/require-meta-docs-description
      categories: ['composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-setup-define-expose.html'
    },
    schema: [],
    messages: {
      unexpected: "The variable '{{name}}' isn't expose in setup scripts."
    }
  },
  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    if (!utils.isScriptSetup(context)) {
      return {}
    }
    const scriptVariableNames = {}
    const exposeSet = new Set([
      'index',
      'item',
      '*this',
      'this',
      '__application_name__',
      '__mpx_mode__',
      '$event'
    ])

    const globalScope = context.getSourceCode().scopeManager.globalScope
    if (globalScope) {
      for (const variable of globalScope.variables) {
        exposeSet.add(variable.name)
      }
      const moduleScope = globalScope.childScopes.find(
        (scope) => scope.type === 'module'
      )
      for (const variable of (moduleScope && moduleScope.variables) || []) {
        if (
          Array.isArray(variable.references) &&
          variable.references[0] &&
          variable.references[0].writeExpr &&
          // @ts-ignore
          variable.references[0].writeExpr.properties
        ) {
          // @ts-ignore
          scriptVariableNames[variable.name] =
            // @ts-ignore
            variable.references[0].writeExpr.properties
        }
      }
    }
    return utils.defineTemplateBodyVisitor(
      context,
      {
        VExpressionContainer(node) {
          for (const ref of node.references.filter(
            (ref) => ref.variable == null
          )) {
            if (
              // @ts-ignore
              node.parent.key &&
              ['key', 'ref', 'for-item', 'for-index'].includes(
                // @ts-ignore
                node.parent.key.name.name
              )
            ) {
              if (
                // @ts-ignore
                node.parent.key.name.name === 'for-item' ||
                // @ts-ignore
                node.parent.key.name.name === 'for-index'
              ) {
                exposeSet.add(ref.id.name)
              }
              continue
            }
            if (!exposeSet.has(ref.id.name)) {
              context.report({
                node,
                messageId: 'unexpected',
                data: {
                  name: ref.id.name
                }
              })
            }
          }
        },
        /** @param {VAttribute} node */
        // @ts-ignore
        VAttribute(node) {
          // wxs
          if (
            node.parent &&
            node.parent.parent &&
            node.parent.parent.name === 'wxs' &&
            node.key &&
            node.key.name === 'module'
          ) {
            // @ts-ignore
            exposeSet.add(node.value.value)
          }

          if (
            node.value &&
            node.value.value &&
            /{{.+}}/.test(node.value.value)
          ) {
            const val = node.value.value
            const matchList = val.match(/\{\{(.+?)\}\}/g)
            // @ts-ignore
            for (let str of matchList) {
              str = str.replace(/(\{\{)|\s|(\}\})/g, '')
              if (
                // 是个变量名称
                // eslint-disable-next-line no-control-regex
                /^([^\u0000-\u00FF]|[a-zA-Z_$])([^\u0000-\u00FF]|[a-zA-Z0-9_$])*$/.test(
                  str
                ) &&
                // 不是true false
                !['true', 'false'].includes(str) &&
                // 没有导出
                !exposeSet.has(str)
              ) {
                context.report({
                  node,
                  messageId: 'unexpected',
                  data: {
                    name: val
                  }
                })
              }
            }
          }
        }
      },
      {
        ObjectExpression(node) {
          const parent = node.parent
          if (parent && parent.type === 'CallExpression') {
            // @ts-ignore
            if (parent.callee.name === 'defineOptions') {
              const isArr = node.properties && Array.isArray(node.properties)
              if (isArr) {
                for (const item of node.properties) {
                  // @ts-ignore
                  if (['data', 'computed', 'methods'].includes(item.key.name)) {
                    const isArrProp =
                      // @ts-ignore
                      item.value.properties &&
                      // @ts-ignore
                      Array.isArray(item.value.properties)
                    if (isArrProp) {
                      handleProperties(
                        // @ts-ignore
                        item.value.properties,
                        exposeSet,
                        scriptVariableNames
                      )
                    }
                  }
                }
              }
            }

            if (
              // @ts-ignore
              parent.callee.name === 'defineProps' ||
              // @ts-ignore
              parent.callee.name === 'withDefaults'
            ) {
              handleProperties(node.properties, exposeSet, scriptVariableNames)
            }
          }
        },
        CallExpression(node) {
          // @ts-ignore
          if (node.callee.name === 'defineExpose') {
            const arg = node.arguments[0]
            if (
              arg &&
              arg.type === 'ObjectExpression' &&
              Array.isArray(arg.properties)
            ) {
              handleProperties(arg.properties, exposeSet, scriptVariableNames)
            } else if (arg && arg.type === 'Identifier') {
              handleIdentifier(arg.name, exposeSet, scriptVariableNames)
            }
          }
        }
      }
    )
  }
}
