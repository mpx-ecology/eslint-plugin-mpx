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
  parser: require.resolve('@mpxjs/mpx-eslint-parser'),
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
      code: '<template><view><view wx:if="foo"></view></view></template>'
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code: '<template><view wx:if="."></view></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code: '<template><view wx:if="/**/"></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:if="foo" wx:else></view></view></template>',
      errors: [
        "'wx:if' and 'wx:else' directives can't exist on the same element. You may want 'wx:elif' directives."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo" wx:elif="bar"></view></view></template>',
      errors: [
        "'wx:if' and 'wx:elif' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:if:aaa="foo"></view></view></template>',
      errors: ["'wx:if' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:if.aaa="foo"></view></view></template>',
      errors: ["'wx:if' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:if></view></view></template>',
      errors: ["'wx:if' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view><view wx:if=""></view></view></template>',
      errors: ["'wx:if' directives require that attribute value."]
    }
  ]
})
