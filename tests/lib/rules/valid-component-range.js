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
const rule = require('../../../lib/rules/valid-component-range')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-component-range', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><component is="{{abc}}" range="abc,a_cd" /></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range="abc" /></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range="other" range@wx="abc"/></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range="other" range@wx|ali="abc"/></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range="other" range@wx:didi="abc"/></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><component/></template>',
      errors: ["'component' element require 'is' attribute."]
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="" range=""/></template>',
      errors: [
        "'component' attribute 'is' require valid value.",
        "'component' attribute 'range' require valid value."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range@wx="" range="abc"/></template>',
      errors: ["'component' attribute 'range@wx' require valid value."]
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range@wx="abc"/></template>',
      errors: ["'component' element require 'range' for backup."]
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc" range /></template>',
      errors: ["'component' attribute 'range' require valid value."]
    },
    {
      filename: 'test.mpx',
      code: '<template><component is="abc"/></template>',
      errors: [
        "'component' element require 'range' attribute to set the scope."
      ]
    }
  ]
})
