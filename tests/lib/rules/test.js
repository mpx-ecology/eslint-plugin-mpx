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

tester.run('test', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}"></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><button></button></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:if=""></view></template>',
      errors: ['1234']
    },
    {
      filename: 'test.mpx',
      code: '<template><button>test</button></template>',
      errors: ['5678']
    }
  ]
})
