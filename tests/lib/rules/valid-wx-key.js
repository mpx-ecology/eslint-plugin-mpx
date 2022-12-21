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
const rule = require('../../../lib/rules/valid-wx-key')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx-key', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="*this"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="id"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="1"></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx', // 给warning
      code: '<template><view wx:for="{{list}}" wx:key="this"></view></template>',
      errors: [
        `'wx:key="this"' does not look like a valid key name (Do not use attributes "this" or "index". Add ignore If necessary).`
      ]
    },
    {
      filename: 'test.mpx', // 给warning
      code: '<template><view wx:for="{{list}}" wx:key="{{ this}}"></view></template>',
      errors: [
        `'wx:key="{{ this}}"' does not look like a valid key name (Do not use attributes "this" or "index". Add ignore If necessary).`
      ]
    },
    {
      filename: 'test.mpx', // 给warning
      code: '<template><view wx:for="{{list}}" wx:key="{{ abc}}"></view></template>',
      errors: [
        `'wx:key="{{ abc}}"' does not look like a valid key name (Did you mean 'wx:key="abc"' ?).`
      ]
    },
    {
      filename: 'test.mpx', // 给warning -自己加ignore index item this
      code: '<template><view wx:for="{{list}}" wx:key="index"></view></template>',
      errors: [
        `'wx:key="index"' does not look like a valid key name (Do not use attributes "this" or "index". Add ignore If necessary).`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="aaa.id"></view></template>',
      errors: [
        `'wx:key="aaa.id"' does not look like a valid key name (Did you mean 'wx:key="id"' ?).`
      ]
    },
    {
      filename: 'test.mpx', // 给warning
      code: '<template><view wx:for="{{list}}"></view></template>',
      errors: [
        `'wx:for' require 'wx:key' directives on the same element. You may add 'wx:key' directives.`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="{{item.abc.id}}"></view></template>',
      errors: [
        `'wx:key="{{item.abc.id}}"' does not look like a valid key name (Did you mean 'wx:key="id"' ?).`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="{{id}}"></view></template>',
      errors: [
        `'wx:key="{{id}}"' does not look like a valid key name (Did you mean 'wx:key="id"' ?).`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="{{ id}}"></view></template>',
      errors: [
        `'wx:key="{{ id}}"' does not look like a valid key name (Did you mean 'wx:key="id"' ?).`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="{{item.id}}"></view></template>',
      errors: [
        `'wx:key="{{item.id}}"' does not look like a valid key name (Did you mean 'wx:key="id"' ?).`
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key="id_{{index}}"></view></template>',
      errors: [`'wx:key="id_{{index}}"' does not look like a valid key name.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><block wx:for="{{list}}"><view wx:key="id"></view></block></template>',
      errors: [
        "'wx:for' require 'wx:key' directives on the same element. You may add 'wx:key' directives.",
        "'wx:key' and 'wx:for' directives need exist on the same element. You may add 'wx:for' directives."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="str" wx:key></view></template>',
      errors: ["'wx:key' directives require that attribute value."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="{{list}}" wx:key.aa="id"></view></template>',
      errors: ["'wx:key' directives require no modifier."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view wx:for="{{list}}" wx:key=""></view></template>',
      errors: ["'wx:key' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view wx:for="{{list}}" wx:key.abc="1"></view></template>',
      errors: ["'wx:key' directives require no modifier."]
    }
  ]
})
