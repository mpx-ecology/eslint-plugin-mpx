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
const rule = require('../../../lib/rules/valid-wx-elif')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx:elif', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif="foo"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif="foo"></view><view wx:elif="foo"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code: `<template>\n    <c1 wx:if="1" />\n    <c2 wx:elif="1" />\n    <c3 wx:else />\n</template>`
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code:
        '<template><view wx:if="foo"></view><view wx:elif="."></view></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code:
        '<template><view wx:if="foo"></view><view wx:elif="/**/"></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code:
        '<template><template wx:elif="foo"><view></view></template></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:elif="foo"></view></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:elif="foo"></view></view></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view></view><view wx:elif="foo"></view></view></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view if="foo"></view><view wx:elif="foo"></view></view></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view></view><view wx:elif="foo"></view></view></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif="foo" wx:if="bar"></view></view></template>',
      errors: [
        "'wx:elif' and 'wx:if' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif="foo" wx:else></view></view></template>',
      errors: [
        "'wx:elif' and 'wx:else' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif:aaa="foo"></view></view></template>',
      errors: ["'wx:elif' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif.aaa="foo"></view></view></template>',
      errors: ["'wx:elif' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:if="foo"></view><view wx:elif></view></view></template>',
      errors: ["'wx:elif' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code:
        '<template><view wx:if="foo"></view><view wx:elif=""></view></template>',
      errors: ["'wx:elif' directives require that attribute value."]
    }
  ]
})
