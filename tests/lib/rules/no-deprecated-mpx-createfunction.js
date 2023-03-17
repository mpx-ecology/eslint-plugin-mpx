/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-deprecated-mpx-createfunction')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})
ruleTester.run('no-deprecated-mpx-createfunction', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createPage({
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createApp({
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createStore({
        })
      </script>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `
      <script>
        mpx.createComponent({
        })
      </script>
      `,
      errors: [
        'The Mpx object of default export is no longer attached to the createComponent runtime method.'
      ]
    }
  ]
})
