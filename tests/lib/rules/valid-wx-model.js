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
const rule = require('../../../lib/rules/valid-wx-model')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('@mpxjs/mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020 }
})

tester.run('valid-wx-model', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="{{foo}}"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><textarea wx:model="{{foo}}"></textarea></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><your-component wx:model="{{foo}}"></your-component></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><your-component wx:model="{{foo}}"wx:model-event="customInput" wx:model-prop="customValue"></your-component></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:model="{{foo}}"></view></template>',
      errors: ["'wx:model' directives aren't supported on <view> elements."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model:aaa="{{foo}}"></template>',
      errors: ["'wx:model' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model.aaa="{{foo}}"></template>',
      errors: ["'wx:model' directives don't support the modifier 'aaa'."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model></template>',
      errors: ["'wx:model' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><MyComponent wx:model="" /></template>',
      errors: ["'wx:model' directives require that attribute value."]
    }
  ]
})
