/**
 * @author Toru Nagashima
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/eqeqeq')

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('eqeqeq', rule, {
  valid: ['<template><view wx:if="{{a === 1}}" /></template>'],
  invalid: [
    {
      code: '<template><view wx:if="{{a == 1}}" /></template>',
      errors: ["Expected '===' and instead saw '=='."]
    }
  ]
})
