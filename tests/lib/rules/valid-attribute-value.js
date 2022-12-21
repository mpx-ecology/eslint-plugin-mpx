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
const rule = require('../../../lib/rules/valid-attribute-value')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-attribute-value', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="id"></view></template>'
    },
    {
      filename: 'test.mpx', // 指令无值也正常
      code: '<template><view wx:if></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="id/"><view wx:else/></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="1"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=""></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:abc=" 1"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=" 1"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:abc="{{ 1 }}"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="{{abc}}"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="{{ 1 }}"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=" {{1}}"></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx', // 给warning ''
      code: `<template><view wx:if='id'></view></template>`,
      errors: [`\`wx:if='id'\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx', // 给warning 无""
      code: `<template><view wx:if=id></view></template>`,
      errors: [`\`wx:if=id\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx', // 给warning 指令无值
      code: `<template><view wx:if=""></view></template>`,
      errors: [`'wx:if=""' directive require that attribute value.`]
    },
    {
      filename: 'test.mpx', // 给warning
      code: `<template><view abc='1'></view></template>`,
      errors: [`\`abc='1'\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx', // 给warning
      code: '<template><view abc=1></view></template>',
      errors: [`\`abc=1\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="{{}}"></view></template>',
      errors: [`'abc="{{}}"' attribute expression require valid value.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="{{ }}"></view></template>',
      errors: [`'abc="{{ }}"' attribute expression require valid value.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="{{ .}}"></view></template>',
      errors: [`'abc="{{ .}}"' attribute expression require valid value.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:abc="{{}}"></view></template>',
      errors: [`'wx:abc="{{}}"' attribute expression require valid value.`]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view wx:for="{{list}}" wx:key=""></view></template>',
      errors: [`'wx:key=""' directive require that attribute value.`]
    }
  ]
})
