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
const rule = require('../../../lib/rules/valid-attribute-quote')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-attribute-quote', rule, {
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
      code: `<template><view abc='"id"'></view></template>`
    },
    {
      filename: 'test.mpx',
      options: ['single'],
      code: `<template><view abc='id'></view></template>`
    },
    {
      filename: 'test.mpx',
      options: [1],
      code: `<template><view abc=''></view></template>`
    },
    {
      filename: 'test.mpx',
      options: [1],
      code: `<template><view abc="''"></view></template>`
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `<template><view wx:if='id'></view></template>`,
      errors: [`\`wx:if='id'\` attribute value require double quotes.`],
      output: `<template><view wx:if="id"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view wx:if=id></view></template>`,
      errors: [`\`wx:if=id\` attribute value require double quotes.`],
      output: `<template><view wx:if="id"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc=1></view></template>`,
      errors: [`\`abc=1\` attribute value require double quotes.`],
      output: `<template><view abc="1"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view abc='1'></view></template>`,
      errors: [`\`abc='1'\` attribute value require double quotes.`],
      output: `<template><view abc="1"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc=`1`></view></template>',
      errors: ['`abc=`1`` attribute value require double quotes.'],
      output: `<template><view abc="1"></view></template>`
    },
    {
      filename: 'test.mpx',
      code: `<template><view wx:if="id"></view></template>`,
      options: ['single'],
      errors: [`\`wx:if="id"\` attribute value require single quotes.`],
      output: `<template><view wx:if='id'></view></template>`
    },
    {
      filename: 'test.mpx',
      code: '<template><view abc="1"></view></template>',
      options: ['single'],
      errors: ['`abc="1"` attribute value require single quotes.'],
      output: `<template><view abc='1'></view></template>`
    }
  ]
})
