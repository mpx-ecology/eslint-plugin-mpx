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
const rule = require('../../../lib/rules/test')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx-if', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view class="a"><input class="b"></input><view class="c"></view><view class="d"></view></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<script>function a (){ this.b = 1 }</script>',
      errors: ['']
    }
  ]
})
