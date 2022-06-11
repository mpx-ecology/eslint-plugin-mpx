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

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce valid `wx:if` directives',
      categories: [''],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-wx-if.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VElement[name='input'] ~ VElement"(node) {
      }
    }, {
      'MemberExpression > ThisExpression'(node) {
        console.log(node)
      }
    })
  }
}
