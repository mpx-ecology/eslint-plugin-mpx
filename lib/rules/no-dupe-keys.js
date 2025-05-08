/**
 * @fileoverview Prevents duplication of field names.
 * @author Armano
 */
'use strict'

const utils = require('../utils')

/**
 * @typedef {import('../utils').GroupName} GroupName
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
/** @type {GroupName[]} */
const GROUP_NAMES = ['properties', 'computed', 'data', 'methods', 'setup']

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow duplication of field names',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-dupe-keys.html'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'object',
        properties: {
          groups: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      name: "Duplicated key '{{name}}'."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    const options = context.options[0] || {}
    const groups = new Set([...GROUP_NAMES, ...(options.groups || [])])

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnMpx(context, (obj) => {
      /**
       * @type {string[]}
       */
      const usedNames = []
      const properties = utils.iterateProperties(obj, groups)

      for (const o of properties) {
        if (usedNames.includes(o.name)) {
          context.report({
            node: o.node,
            messageId: 'name',
            data: {
              name: o.name
            }
          })
        }

        usedNames.push(o.name)
      }
    })
  }
}
