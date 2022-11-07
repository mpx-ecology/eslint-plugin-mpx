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
const rule = require('../../../lib/rules/valid-swiper-item-style')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-swiper-item-style', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view style="{{viewStyle1}}"><view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><swiper-item></swiper-item></template>'
    },
    {
      filename: 'test.mpx',
      code: `'<template><swiper-item style=""></swiper-item></template>`
    },
    {
      filename: 'test.mpx',
      code: `'<template><swiper-item><view style="{{viewStyle}}"></view></swiper-item></template>`
    },
    {
      filename: 'test.mpx',
      code: `'<template><swiper-item style="color: #ccc;"></swiper-item></template>`
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><swiper-item style="{{test}}"></swiper-item></template>',
      errors: [
        "'<swiper-item>' 动态样式建议在子节点上设置，否则数据变更时可能出现样式异常."
      ]
    },
    {
      filename: 'test.mpx',
      code: `'<template><swiper-item wx:style="{{wxTest}}"></swiper-item></template>`,
      errors: [
        "'<swiper-item>' 动态样式建议在子节点上设置，否则数据变更时可能出现样式异常."
      ]
    }
  ]
})
