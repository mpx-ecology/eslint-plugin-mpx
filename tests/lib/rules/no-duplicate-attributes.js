/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-duplicate-attributes')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('no-duplicate-attributes', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view style="" wx:style="{}"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view class="" wx:class="{}"></view></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view><view foo foo></view></view></template>',
      errors: ["Duplicate attribute 'foo'."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view bindtap="foo" bindtap="bar"></view></view></template>',
      errors: ["Duplicate attribute 'bindtap'."]
    }
  ]
})
