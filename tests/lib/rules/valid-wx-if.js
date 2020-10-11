/**
 * @author pagnkelly
 * @copyright 2020 pagnkelly. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/valid-wx-if')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx-if', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:if="foo"></div></div></template>'
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code: '<template><div wx:if="."></div></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code: '<template><div wx:if="/**/"></div></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:if="foo" wx:else></div></div></template>',
      errors: [
        "'wx:if' and 'wx:else' directives can't exist on the same element. You may want 'wx:elif' directives."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo" wx:elif="bar"></div></div></template>',
      errors: [
        "'wx:if' and 'wx:elif' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:if:aaa="foo"></div></div></template>',
      errors: ["'wx:if' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:if.aaa="foo"></div></div></template>',
      errors: ["'wx:if' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:if></div></div></template>',
      errors: ["'wx:if' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><div><div wx:if=""></div></div></template>',
      errors: ["'wx:if' directives require that attribute value."]
    }
  ]
})
