/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-deprecated-watch-second-param')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})
ruleTester.run('no-deprecated-watch-second-param', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `<script>watch(refValue, () => {})</script>`
    },
    {
      filename: 'test.mpx',
      code: `<script>watch(refValue, handler)</script>`
    },
    {
      filename: 'test.mpx',
      code: `<script>watch(refValue, () => {}, { immediate: true })</script>`
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `
        <script> watch(refValue, { handler() {} })</script>
      `,
      errors: [
        'The watch API no longer accepts the second parameter as an object with the handler attribute.'
      ]
    }
  ]
})
