/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-deprecated-lifecycle')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})
ruleTester.run('no-deprecated-destroyed-lifecycle', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          pageLifetimes: {
            show() {},
            hide() {}
          }
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          pageLifetimes: {
            show,
            hide
          }
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          pageLifetimes: {
            show: pageShow,
            hide: pageHide
          }
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          ...pageShow,
          ...pageHide
        })
      </script>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          [pageShow] () {},
          [pageHide] () {}
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
        createComponent({
          pageShow () {},
          pageHide () {}
        })
      </script>
      `,
      output: `
      <script>
        createComponent({
          pageLifetimes: {
            show() {},
            hide() {}
          }
        })
      </script>
      `,
      errors: [
        {
          message:
            'The `pageShow` lifecycle hook is deprecated. Use `pageLifetimes.show` instead.',
          line: 4
        },
        {
          message:
            'The `pageHide` lifecycle hook is deprecated. Use `pageLifetimes.hide` instead.',
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
        createComponent({
          pageShow,
          pageHide
        })
      </script>
      `,
      output: `
      <script>
        createComponent({
          pageLifetimes: {
            show: pageShow,
            hide: pageHide
          }
        })
      </script>
      `,
      errors: [
        {
          message:
            'The `pageShow` lifecycle hook is deprecated. Use `pageLifetimes.show` instead.',
          line: 4
        },
        {
          message:
            'The `pageHide` lifecycle hook is deprecated. Use `pageLifetimes.hide` instead.',
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
      createComponent({
        ['pageShow']() {},
        ['pageHide']() {},
      })
      </script>
      `,
      output: `
      <script>
      createComponent({
        pageLifetimes: {
          ['show']() {},
          ['hide']() {},
        }
      })
      </script>
      `,
      errors: [
        {
          message:
            'The `pageShow` lifecycle hook is deprecated. Use `pageLifetimes.show` instead.',
          line: 4
        },
        {
          message:
            'The `pageHide` lifecycle hook is deprecated. Use `pageLifetimes.hide` instead.',
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
      createComponent({
        [\`pageShow\`]() {},
        [\`pageHide\`]() {},
      })
      </script>
      `,
      output: `
      <script>
      createComponent({
        pageLifetimes: {
          [\`show\`]() {},
          [\`hide\`]() {},
        }
      })
      </script>
      `,
      errors: [
        {
          message:
            'The `pageShow` lifecycle hook is deprecated. Use `pageLifetimes.show` instead.',
          line: 4
        },
        {
          message:
            'The `pageHide` lifecycle hook is deprecated. Use `pageLifetimes.hide` instead.',
          line: 5
        }
      ]
    }
  ]
})
