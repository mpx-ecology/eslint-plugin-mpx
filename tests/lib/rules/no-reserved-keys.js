/**
 * @fileoverview Prevent overwrite reserved keys
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-reserved-keys')
const RuleTester = require('eslint').RuleTester

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('no-reserved-keys', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: ['foo'],
          computed: {
            bar () {
            }
          },
          data () {
            return {
              dat: null
            }
          },
          methods: {
            _foo () {},
            test () {
            }
          }
        })
      `,
      parserOptions
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => {
            return {
              dat: null
            }
          },
          methods: {
            _foo () {},
            test () {
            }
          }
        })
      `,
      parserOptions
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => ({
            dat: null
          }),
          methods: {
            _foo () {},
            test () {
            }
          }
        })
      `,
      parserOptions
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => ({
            dat: null
          }),
          methods: {
            _foo () {},
            test () {
            }
          },
          setup () {
            return {
              _bar: () => {}
            }
          }
        })
      `,
      parserOptions
    }
  ],

  invalid: [
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          properties: {
            $el: String
          }
        })
      `,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          setup () {
            return {
              $el: ''
            }
          }
        })
      `,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          data: {
            _foo: String
          }
        })
      `,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Keys starting with with '_' are reserved in '_foo' group.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          data: () => {
            return {
              _foo: String
            }
          }
        })
      `,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Keys starting with with '_' are reserved in '_foo' group.",
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          data: () => ({
            _foo: String
          })
        })
      `,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Keys starting with with '_' are reserved in '_foo' group.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
        createComponent({
          foo: {
            bar: String
          }
        })
      `,
      options: [{ reserved: ['bar'], groups: ['foo'] }],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Key 'bar' is reserved.",
          line: 4
        }
      ]
    }
  ]
})
