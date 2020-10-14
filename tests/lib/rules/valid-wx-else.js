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
const rule = require('../../../lib/rules/valid-wx-else')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx:else', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif="foo"></view><view wx:else></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code: `<template>\n    <c1 wx:if="1" />\n    <c2 wx:elif="1" />\n    <c3 wx:else />\n</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><template wx:else><view></view></template></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:else></view></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:else></view></view></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view></view><view wx:else></view></view></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view if="foo"></view><view wx:else></view></view></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view></view><view wx:else></view></view></template>',
      errors: [
        "'wx:else' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else wx:if="bar"></view></view></template>',
      errors: [
        "'wx:else' and 'wx:if' directives can't exist on the same element. You may want 'wx:elif' directives."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else wx:elif="foo"></view></view></template>',
      errors: [
        "'wx:else' and 'wx:elif' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else:aaa></view></view></template>',
      errors: ["'wx:else' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else.aaa></view></view></template>',
      errors: ["'wx:else' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:else="foo"></view></view></template>',
      errors: ["'wx:else' directives require no attribute value."]
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code: '<template><view wx:if="foo"></view><view wx:else="."></view></template>',
      errors: ["'wx:else' directives require no attribute value."]
    },
    // comment value
    {
      filename: 'comment-value.mpx',
      code:
        '<template><view wx:if="foo"></view><view wx:else="/**/"></view></template>',
      errors: ["'wx:else' directives require no attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view wx:if="foo"></view><view wx:else=""></view></template>',
      errors: ["'wx:else' directives require no attribute value."]
    }
  ]
})
