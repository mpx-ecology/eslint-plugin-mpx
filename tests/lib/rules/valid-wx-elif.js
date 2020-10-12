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
        '<template><div><div wx:if="foo"></div><div wx:elif="foo"></div></div></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif="foo"></div><div wx:elif="foo"></div></div></template>'
    },
    {
      filename: 'test.mpx',
      code: `<template>\n    <c1 wx:if="1" />\n    <c2 wx:elif="1" />\n    <c3 wx:else />\n</template>`
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code:
        '<template><div wx:if="foo"></div><div wx:elif="."></div></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code:
        '<template><div wx:if="foo"></div><div wx:elif="/**/"></div></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code:
        '<template><template wx:elif="foo"><div></div></template></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:elif="foo"></div></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><div><div wx:elif="foo"></div></div></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div></div><div wx:elif="foo"></div></div></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div if="foo"></div><div wx:elif="foo"></div></div></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div></div><div wx:elif="foo"></div></div></template>',
      errors: [
        "'wx:elif' directives require being preceded by the element which has a 'wx:if' or 'wx:elif' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif="foo" wx:if="bar"></div></div></template>',
      errors: [
        "'wx:elif' and 'wx:if' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif="foo" wx:else></div></div></template>',
      errors: [
        "'wx:elif' and 'wx:else' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif:aaa="foo"></div></div></template>',
      errors: ["'wx:elif' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif.aaa="foo"></div></div></template>',
      errors: ["'wx:elif' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div><div wx:if="foo"></div><div wx:elif></div></div></template>',
      errors: ["'wx:elif' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code:
        '<template><div wx:if="foo"></div><div wx:elif=""></div></template>',
      errors: ["'wx:elif' directives require that attribute value."]
    }
  ]
})
