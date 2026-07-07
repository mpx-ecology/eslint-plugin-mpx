/**
 * @author xwd
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')
const espree = require('espree')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check whether the AST node contains a CallExpression.
 * @param {ASTNode} node
 * @returns {boolean}
 */
function hasCallExpression(node) {
  if (!node || typeof node.type !== 'string') {
    return false
  }
  if (node.type === 'CallExpression') {
    return true
  }
  for (const key of Object.keys(node)) {
    if (key === 'parent') continue
    const child = node[key]
    if (Array.isArray(child)) {
      for (const item of child) {
        if (item && typeof item === 'object' && hasCallExpression(item)) {
          return true
        }
      }
    } else if (child && typeof child === 'object') {
      if (hasCallExpression(child)) {
        return true
      }
    }
  }
  return false
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow call expressions in template interpolation',
      categories: undefined,
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-call-expressions-in-template.html'
    },
    schema: [],
    messages: {
      unexpectedCall:
        "Method calls in template '{{}}' are only supported on web platform."
    }
  },
  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VExpressionContainer} node */
      VExpressionContainer(node) {
        if (node.expression && hasCallExpression(node.expression)) {
          context.report({
            node,
            messageId: 'unexpectedCall'
          })
        }
      },
      /** @param {VAttribute} node */
      // @ts-ignore
      VAttribute(node) {
        if (!node.value || !node.value.value) {
          return
        }
        // Non-directive attributes with {{ }} are stored as literal strings,
        // not as VExpressionContainer. Parse the expression to detect calls.
        if (!/{{.+}}/.test(node.value.value)) {
          return
        }
        const match = node.value.value.match(/\{\{(.+?)\}\}/)
        if (!match) {
          return
        }
        const exprStr = match[1].trim()
        if (!exprStr) {
          return
        }
        try {
          const ast = espree.parse(exprStr, { ecmaVersion: 2020 })
          if (hasCallExpression(ast)) {
            context.report({
              node,
              messageId: 'unexpectedCall'
            })
          }
        } catch (e) {
          // ignore parse errors for invalid expressions
        }
      }
    })
  }
}
