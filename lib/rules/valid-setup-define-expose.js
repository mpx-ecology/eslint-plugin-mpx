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
  node.argument.arguments.forEach((arg) => {
    if (arg.type === 'ArrayExpression') {
      arg.elements.forEach((el) => {
        exposeSet.add(el.value)
      })
    }
  })
}

/**
 * @param {(Property| SpreadElement)[]} properties - 展开节点
 * @param {Set<String>} exposeSet 存储定义的expose变量
 * @param {Object} scriptVariableNames 用于解析定义的展开的expose变量
 */
function handleProperties(properties, exposeSet, scriptVariableNames) {
  properties.forEach((prop) => {
    // defineExpose({a:1})
    if (prop.type === 'Property') {
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
      scriptVariableNames[prop.argument.name]
    ) {
      // defineExpose(...a)
      const props = scriptVariableNames[prop.argument.name]
      for (const p of props) {
        exposeSet.add(p.key.name)
      }
    }
  })
}
/**
 * @param {String} name - 展开节点
 * @param {Set<String>} exposeSet 存储定义的expose变量
 * @param {Object} scriptVariableNames 用于解析定义的展开的expose变量
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
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/script-setup-uses-vars.html'
    },
    deprecated: true,
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
    const globalScope = context.getSourceCode().scopeManager.globalScope
    if (globalScope) {
      const moduleScope = globalScope.childScopes.find(
        (scope) => scope.type === 'module'
      )
      for (const variable of (moduleScope && moduleScope.variables) || []) {
        if (
          Array.isArray(variable.references) &&
          variable.references[0] &&
          variable.references[0].writeExpr &&
          variable.references[0].writeExpr.properties
        ) {
          scriptVariableNames[variable.name] =
            variable.references[0].writeExpr.properties
        }
      }
    }
    const exposeSet = new Set()
    return utils.defineTemplateBodyVisitor(
      context,
      {
        VExpressionContainer(node) {
          for (const ref of node.references.filter(
            (ref) => ref.variable == null
          )) {
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
        'VAttribute[directive=false]'(node) {
          if (node.value) {
            let val = node.value.value
            val = val.replace(/(\{\{)|\s|(\}\})/g, '')
            if (!exposeSet.has(val)) {
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
      },
      {
        ObjectExpression(node) {
          const parent = node.parent
          if (parent && parent.type === 'CallExpression') {
            if (parent.callee.name === 'defineOptions') {
              if (node.properties && Array.isArray(node.properties)) {
                node.properties.forEach((item) => {
                  if (['data', 'computed', 'methods'].includes(item.key.name)) {
                    if (
                      item.value.properties &&
                      Array.isArray(item.value.properties)
                    ) {
                      handleProperties(
                        item.value.properties,
                        exposeSet,
                        scriptVariableNames
                      )
                    }
                  }
                })
              }
            }

            if (parent.callee.name === 'defineProps') {
              handleProperties(node.properties, exposeSet, scriptVariableNames)
            }
          }
        },
        CallExpression(node) {
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
