/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-dupe-wx-elif')

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  }
})

tester.run('no-dupe-wx-elif', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" />
        <div wx:elif="bar" />
        <div wx:elif="baz" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" >
          <div wx:elif="foo" />
        </div>
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" />
        <div wx:elif="bar" />
        <div wx:if="bar" />
        <div wx:elif="foo" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="isSomething(x)" />
        <div wx:elif="isSomethingElse(x)" />

        <div wx:if="a" />
        <div wx:elif="b" />
        <div wx:elif="c && d" />
        <div wx:elif="c && e" />

        <div wx:if="n === 1" />
        <div wx:elif="n === 2" />
        <div wx:elif="n === 3" />
        <div wx:elif="n === 4" />
        <div wx:elif="n === 5" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" />
        <div />
        <div wx:elif="foo" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if />
        <div wx:elif />
      </template>
      `
    },
    // parse error
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo." />
        <div wx:elif="foo." />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:elif="foo." />
        <div wx:elif="foo" />
      </template>
      `
    },

    // Referred to the ESLint core rule.
    '<template><div wx:if="a" /><div wx:elif="b" /></template>',
    '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c" /></template>',
    '<template><div wx:if="true" /><div wx:elif="false" /></template>',
    '<template><div wx:if="1" /><div wx:elif="2" /></template>',
    '<template><div wx:if="f" /><div wx:elif="f()" /></template>',
    '<template><div wx:if="f(a)" /><div wx:elif="g(a)" /></template>',
    '<template><div wx:if="f(a)" /><div wx:elif="f(b)" /></template>',
    '<template><div wx:if="a === 1" /><div wx:elif="a === 2" /></template>',
    '<template><div wx:if="a === 1" /><div wx:elif="b === 1" /></template>',
    '<template><div wx:if="a" /></template>',
    '<template><div wx:if="a"><div wx:if="a" /></div></template>',
    '<template><div wx:if="a"><div wx:if="b" /></div><div wx:elif="b" /></template>',
    '<template><div wx:if="a"><div wx:if="b" /><div wx:elif="a" /></div></template>',
    '<template><div wx:if="a" /><div wx:elif="!!a" /></template>',
    '<template><div wx:if="a === 1" /><div wx:elif="a === (1)" /></template>',
    '<template><div wx:if="a || b" /><div wx:elif="c || d" /></template>',
    '<template><div wx:if="a || b" /><div wx:elif="a || c" /></template>',
    '<template><div wx:if="a" /><div wx:elif="a || b" /></template>',
    '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="a || b || c" /></template>',
    '<template><div wx:if="a && b" /><div wx:elif="a" /><div wx:elif="b" /></template>',
    '<template><div wx:if="a && b" /><div wx:elif="b && c" /><div wx:elif="a && c" /></template>',
    '<template><div wx:if="a && b" /><div wx:elif="b || c" /></template>',
    '<template><div wx:if="a" /><div wx:elif="b && (a || c)" /></template>',
    '<template><div wx:if="a" /><div wx:elif="b && (c || d && a)" /></template>',
    '<template><div wx:if="a && b && c" /><div wx:elif="a && b && (c || d)" /></template>'
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" />
        <div wx:elif="foo" />
      </template>
      `,
      errors: [
        {
          message:
            'This branch can never execute. Its condition is a duplicate or covered by previous conditions in the `wx:if` / `wx:elif` chain.',
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 28
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="isSomething(x)" />
        <div wx:elif="isSomething(x)" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a" />
        <div wx:elif="b" />
        <div wx:elif="c && d" />
        <div wx:elif="c && d" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 6
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="n === 1" />
        <div wx:elif="n === 2" />
        <div wx:elif="n === 3" />
        <div wx:elif="n === 2" />
        <div wx:elif="n === 5" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 6
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a || b" />
        <div wx:elif="a" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a" />
        <div wx:elif="b" />
        <div wx:elif="a || b" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a" />
        <div wx:elif="a && b" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a && b" />
        <div wx:elif="a && b && c" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a || b" />
        <div wx:elif="b && c" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a" />
        <div wx:elif="b && c" />
        <div wx:elif="d && (c && e && b || a)" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 5
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="foo" />
        <div wx:elif="foo && bar" />
        <div wx:elif="baz && foo" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4,
          column: 25,
          endLine: 4,
          endColumn: 28
        },
        {
          messageId: 'unexpected',
          line: 5,
          column: 32,
          endLine: 5,
          endColumn: 35
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a && b" />
        <div wx:elif="a && b && c" />
        <div wx:elif="a && c && b" />
      </template>
      `,
      errors: [
        { messageId: 'unexpected', line: 4 },
        { messageId: 'unexpected', line: 5 }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <div wx:if="a || b" />
        <div wx:elif="a" />
        <div wx:elif="b" />
      </template>
      `,
      errors: [
        { messageId: 'unexpected', line: 4 },
        { messageId: 'unexpected', line: 5 }
      ]
    },
    {
      filename: 'foo.vue',
      code: `
      <template>
        <div wx:if      ="((f && e) || d) && c || (b && a)" />
        <div wx:elif ="(a && b) || (c && (d || (e && f)))" />
        <div wx:elif ="(a && b) || (c && (d || (e && f)))" />
      </template>
      `,
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },

    // Referred to the ESLint core rule.
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="a" /><div wx:elif="c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c" /><div wx:elif="b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c" /><div wx:elif="b" /><div wx:elif="d" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c" /><div wx:elif="d" /><div wx:elif="b" /><div wx:elif="e" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="a" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="a" /><div wx:elif="b" /><div wx:elif="a" /></template>',
      errors: [
        { messageId: 'unexpected' },
        { messageId: 'unexpected' },
        { messageId: 'unexpected' }
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a"><div wx:if="b" /></div><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a === 1" /><div wx:elif="a === 1" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="1 < a" /><div wx:elif="1 < a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="true" /><div wx:elif="true" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a && b" /><div wx:elif="a && b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a && b || c" /><div wx:elif="a && b || c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="f(a)" /><div wx:elif="f(a)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a === 1" /><div wx:elif="a===1" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a === 1" /><div wx:elif="a === /* comment */ 1" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a || b" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="a" /><div wx:elif="b" /></template>',
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="b || a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="a || b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="c || d" /><div wx:elif="a || d" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="(a === b && fn(c)) || d" /><div wx:elif="fn(c) && a === b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a" /><div wx:elif="a && b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a && b" /><div wx:elif="a && b && c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || c" /><div wx:elif="a && b || c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c && a || b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c && (a || b)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b && c" /><div wx:elif="d && (a || e && c && b)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b && c" /><div wx:elif="b && c && d" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="b && c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="(a || b) && c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="(a && (b || c)) || d" /><div wx:elif="(c || b) && e && a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a && b || b && c" /><div wx:elif="a && b && c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b && c" /><div wx:elif="d && (c && e && b || a)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || (b && (c || d))" /><div wx:elif="(d || c) && b" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="(b || a) && c" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="c" /><div wx:elif="d" /><div wx:elif="b && (a || c)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b || c" /><div wx:elif="a || (b && d) || (c && e)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || (b || c)" /><div wx:elif="a || (b && c)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || b" /><div wx:elif="c" /><div wx:elif="d" /><div wx:elif="(a || c) && (b || d)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a" /><div wx:elif="b" /><div wx:elif="c && (a || d && b)" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a" /><div wx:elif="a || a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a || a" /><div wx:elif="a || a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a || a" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a" /><div wx:elif="a && a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><div wx:if="a && a" /><div wx:elif="a && a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><div wx:if="a && a" /><div wx:elif="a" /></template>',
      errors: [{ messageId: 'unexpected' }]
    }
  ]
})
