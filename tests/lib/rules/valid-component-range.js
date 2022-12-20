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
      filename: 'test.mpx', // 暂时不判空了
      code: '<template><component is="" range=""/></template>'
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
      code: '<template><component is="abc"/></template>',
      errors: [
        "'component' element require 'range' attribute to set the scope."
      ]
    }
  ]
})
