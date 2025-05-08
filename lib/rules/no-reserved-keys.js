/**
 * @fileoverview Prevent overwrite reserved keys
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

const RESERVED_KEYS = require('../utils/mpx-reserved.json')
/** @type {GroupName[]} */
const GROUP_NAMES = ['properties', 'computed', 'data', 'methods', 'setup']

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow overwriting reserved keys',
      categories: ['mpx-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-reserved-keys.html'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          reserved: {
            type: 'array'
          },
          groups: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      reserved: "Key '{{name}}' is reserved.",
      group: "Keys starting with with '_' are reserved in '{{name}}' group."
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    const options = context.options[0] || {}
    const reservedKeys = new Set([
      ...RESERVED_KEYS,
      ...(options.reserved || [])
    ])
    const groups = new Set([...GROUP_NAMES, ...(options.groups || [])])

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return utils.executeOnMpx(context, (obj) => {
      const properties = utils.iterateProperties(obj, groups)
      for (const o of properties) {
        if (o.groupName === 'data' && o.name[0] === '_') {
          context.report({
            node: o.node,
            messageId: 'group',
            data: {
              name: o.name
            }
          })
        } else if (reservedKeys.has(o.name)) {
          context.report({
            node: o.node,
            messageId: 'reserved',
            data: {
              name: o.name
            }
          })
        }
      }
    })
  }
}
