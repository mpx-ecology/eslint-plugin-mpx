/**
 * @fileoverview Enforces that a return statement is present in computed property (return-in-computed-property)
 * @author Armano
 */
'use strict'

const utils = require('../utils')

/**
 * @typedef {import('../utils').ComponentComputedProperty} ComponentComputedProperty
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'enforce that a return statement is present in computed property',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/return-in-computed-property.html'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          treatUndefinedAsUnspecified: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      returnValue: 'Expected to return a value in "{{name}}" computed property.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    const options = context.options[0] || {}
    const treatUndefinedAsUnspecified = !(
      options.treatUndefinedAsUnspecified === false
    )

    /**
     * @type {Set<ComponentComputedProperty>}
     */
    const computedProperties = new Set()

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.assign(
      {},
      utils.defineMpxVisitor(context, {
        onMpxObjectEnter(obj) {
          for (const computedProperty of utils.getComputedProperties(obj)) {
            computedProperties.add(computedProperty)
          }
        }
      }),
      utils.executeOnFunctionsWithoutReturn(
        treatUndefinedAsUnspecified,
        (node) => {
          for (const cp of computedProperties) {
            if (cp.value && cp.value.parent === node) {
              context.report({
                node,
                messageId: 'returnValue',
                data: {
                  name: cp.key || 'Unknown'
                }
              })
            }
          }
        }
      )
    )
  }
}
