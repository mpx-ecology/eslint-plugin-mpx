/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Get the name of the given attribute node.
 * @param {VAttribute | VDirective} attribute The attribute node to get.
 * @returns {string | null} The name of the attribute.
 */
function getName(attribute) {
  if (!attribute.directive) {
    return attribute.key.name
  }
  if (attribute.key.name.name.startsWith('bind')) {
    return (
      (attribute.key.argument &&
        attribute.key.argument.type === 'VIdentifier' &&
        attribute.key.name.name + attribute.key.argument.name) ||
      attribute.key.name.name ||
      null
    )
  }
  return null
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow duplication of attributes',
      categories: ['mpx-essential'],
      url: 'https://eslint.vuejs.org/rules/no-duplicate-attributes.html'
    },
    fixable: null,

    schema: [
      {
        type: 'object',
        properties: {
          allowCoexistClass: {
            type: 'boolean'
          },
          allowCoexistStyle: {
            type: 'boolean'
          }
        }
      }
    ]
  },
  /** @param {RuleContext} context */
  create(context) {
    /** @type {Set<string>} */
    const directiveNames = new Set()
    /** @type {Set<string>} */
    const attributeNames = new Set()

    /**
     * @param {string} name
     */
    function isDuplicate(name) {
      return directiveNames.has(name) || attributeNames.has(name)
    }

    return utils.defineTemplateBodyVisitor(context, {
      VStartTag() {
        directiveNames.clear()
        attributeNames.clear()
      },
      VAttribute(node) {
        const name = getName(node)
        if (name == null) {
          return
        }

        if (isDuplicate(name)) {
          context.report({
            node,
            loc: node.loc,
            message: "Duplicate attribute '{{name}}'.",
            data: { name }
          })
        }

        if (node.directive) {
          directiveNames.add(name)
        } else {
          attributeNames.add(name)
        }
      }
    })
  }
}
