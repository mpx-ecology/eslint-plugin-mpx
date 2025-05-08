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
const rule = require('../../../lib/rules/valid-template-quote')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-template-quote', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="id"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="id"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=""></view></template>'
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc="\n"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc='"id"'></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc='id'></view></template>`,
      options: ['single']
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc=''></view></template>`,
      options: [1]
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc="''"></view></template>`,
      options: [1]
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `<template><view wx:if='id'></view></template>`,
      output: `<template><view wx:if="id"></view></template>`,
      errors: [`\`wx:if='id'\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx',
      code: `<template><view wx:if=id></view></template>`,
      output: `<template><view wx:if="id"></view></template>`,
      errors: [`\`wx:if=id\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc=1></view></template>`,
      output: `<template><view abc="1"></view></template>`,
      errors: [`\`abc=1\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc='1'></view></template>`,
      output: `<template><view abc="1"></view></template>`,
      errors: [`\`abc='1'\` attribute value require double quotes.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=`1`></view></template>',
      output: `<template><view abc="1"></view></template>`,
      errors: ['`abc=`1`` attribute value require double quotes.']
    },
    {
      filename: 'test.mpx',
      code: `<template><view wx:if="id"></view></template>`,
      output: `<template><view wx:if='id'></view></template>`,
      options: ['single'],
      errors: [`\`wx:if="id"\` attribute value require single quotes.`]
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="1"></view></template>',
      output: `<template><view abc='1'></view></template>`,
      options: ['single'],
      errors: ['`abc="1"` attribute value require single quotes.']
    }
  ]
})
