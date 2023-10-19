/**
 * @fileoverview Enforces that a return statement is present in computed property (valid-properties)
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/valid-properties')
const RuleTester = require('eslint').RuleTester

// const parserOptions = {
//   ecmaVersion: 2020,
//   sourceType: "module"
// }
const mpxParser = require.resolve('mpx-eslint-parser')
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})
ruleTester.run('valid-properties', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: {
            propsA: {
              type: String,
              value: ""
            },
            propsB: String,
            propsC: {
              type: String,
              optionalTypes:[Number],
              observer: ()=>{}
            }

          }
        })
        `
    },
    {
      filename: 'test.mpx',
      code: `
        <script setup>
          const props = defineProps({
            propsA: {
              type: Object,
              value: {}
            },
            propsB: Array
          })
        </script>
        `,
      parser: mpxParser
    }
  ],

  invalid: [
    {
      filename: 'test.mpx',
      code: `
      createComponent({
        properties: {
          propsA: {
            type: String,
            default: ""
          },
          propsB: {},
          propsC: {
            type: String,
            optionalTypes:[Number],
            observer: ()=>{}
          },
          propsD: '',
          propsE: [1,2],
          propsF: {
            value: {}
          }
        }
      })
      `,
      options: [
        {
          allowKeys: ['type', 'value', 'optionalTypes']
        }
      ],
      errors: [
        {
          message: "Property 'propsA' has invalid key 'default'.",
          line: 6
        },
        {
          message: "The value of 'propsB' cannot be empty object.",
          line: 8
        },
        {
          message: "Property 'propsC' has invalid key 'observer'.",
          line: 12
        },
        {
          message: "Invalid value for 'propsD'.",
          line: 14
        },
        {
          message: "Invalid value for 'propsE'.",
          line: 15
        },
        {
          message: "Property 'propsF' requires 'type' key.",
          line: 16
        }
      ]
    },

    {
      filename: 'test.mpx',
      code: `
        <script setup>
          const props = defineProps({
            propsA: {
              type: Object,
              default: {}
            },
            propsB: {}
          })
        </script>
        `,
      parser: mpxParser,
      errors: [
        {
          message: "Property 'propsA' has invalid key 'default'.",
          line: 6
        },
        {
          message: "The value of 'propsB' cannot be empty object.",
          line: 8
        }
      ]
    }
  ]
})
