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
    schema: []
  },
  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    if (!utils.isScriptSetup(context)) {
      return {}
    }
    /** @type {Set<string>} */
    const scriptVariableNames = new Set()
    const globalScope = context.getSourceCode().scopeManager.globalScope
    if (globalScope) {
      for (const variable of globalScope.variables) {
        scriptVariableNames.add(variable.name)
      }
      const moduleScope = globalScope.childScopes.find(
        (scope) => scope.type === 'module'
      )
      for (const variable of (moduleScope && moduleScope.variables) || []) {
        scriptVariableNames.add(variable.name)
      }
    }

    /**
     * @see https://github.com/vuejs/vue-next/blob/2749c15170ad4913e6530a257db485d4e7ed2283/packages/compiler-core/src/transforms/transformElement.ts#L333
     * @param {string} name
     */
    // function markSetupReferenceVariableAsUsed(name) {
    //   if (scriptVariableNames.has(name)) {
    //     context.markVariableAsUsed(name)
    //     return true
    //   }
    //   return false
    // }

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VExpressionContainer(node) {
          for (const ref of node.references.filter(
            (ref) => ref.variable == null
          )) {
            context.markVariableAsUsed(ref.id.name)
          }
        },
        // VElement(node) {
        //   if (utils.isMpElementName(node.rawName)) {
        //     return
        //   }
        //   markSetupReferenceVariableAsUsed(node.rawName)
        // },
        /** @param {VAttribute} node */
        'VAttribute[directive=false]'(node) {
          if (node.value) {
            let val = node.value.value
            val = val.replace(/(\{\{)|\s|(\}\})/g, '')
            context.markVariableAsUsed(val)
          }
        }
      },
      {},
      {
        templateBodyTriggerSelector: 'Program'
      }
    )
  }
}
