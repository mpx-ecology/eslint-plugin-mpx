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
        <view wx:if="{{foo}}" />
        <view wx:elif="{{bar}}" />
        <view wx:elif="{{baz}}" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{foo}}" >
          <view wx:elif="{{foo}}" />
        </view>
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{foo}}" />
        <view wx:elif="{{bar}}" />
        <view wx:if="{{bar}}" />
        <view wx:elif="{{foo}}" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>

        <view wx:if="{{a}}" />
        <view wx:elif="{{b}}" />
        <view wx:elif="{{c && d}}" />
        <view wx:elif="{{c && e}}" />

        <view wx:if="{{n === 1}}" />
        <view wx:elif="{{n === 2}}" />
        <view wx:elif="{{n === 3}}" />
        <view wx:elif="{{n === 4}}" />
        <view wx:elif="{{n === 5}}" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{foo}}" />
        <view />
        <view wx:elif="{{foo}}" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if />
        <view wx:elif />
      </template>
      `
    },
    // parse error
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{foo.}}" />
        <view wx:elif="{{foo.}}" />
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:elif="{{foo.}}" />
        <view wx:elif="{{foo}}" />
      </template>
      `
    },

    // Referred to the ESLint core rule.
    '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c}}" /></template>',
    '<template><view wx:if="{{true}}" /><view wx:elif="{{false}}" /></template>',
    '<template><view wx:if="{{1}}" /><view wx:elif="{{2}}" /></template>',
    '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{a === 2}}" /></template>',
    '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{b === 1}}" /></template>',
    '<template><view wx:if="{{a}}" /></template>',
    '<template><view wx:if="{{a}}"><view wx:if="{{a}}" /></view></template>',
    '<template><view wx:if="{{a}}"><view wx:if="{{b}}" /></view><view wx:elif="{{b}}" /></template>',
    '<template><view wx:if="{{a}}"><view wx:if="{{b}}" /><view wx:elif="{{a}}" /></view></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="{{!!a}}" /></template>',
    '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{a === (1)}}" /></template>',
    '<template><view wx:if="{{a || b}}" /><view wx:elif="{{c || d}}" /></template>',
    '<template><view wx:if="{{a || b}}" /><view wx:elif="{{a || c}}" /></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="{{a || b}}" /></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="b" /><view wx:elif="{{a || b || c}}" /></template>',
    '<template><view wx:if="{{a && b}}" /><view wx:elif="{{a}}" /><view wx:elif="{{b}}" /></template>',
    '<template><view wx:if="{{a && b}}" /><view wx:elif="{{b && c}}" /><view wx:elif="{{a && c}}" /></template>',
    '<template><view wx:if="{{a && b}}" /><view wx:elif="{{b || c}}" /></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="{{b && (a || c)}}" /></template>',
    '<template><view wx:if="{{a}}" /><view wx:elif="{{b && (c || d && a)}}" /></template>',
    '<template><view wx:if="{{a && b && c}}" /><view wx:elif="{{a && b && (c || d)}}" /></template>'
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{foo}}" />
        <view wx:elif="{{foo}}" />
      </template>
      `,
      errors: [
        {
          message:
            'This branch can never execute. Its condition is a duplicate or covered by previous conditions in the `wx:if` / `wx:elif` chain.',
          line: 4,
          column: 26,
          endLine: 4,
          endColumn: 29
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{a}}" />
        <view wx:elif="{{b}}" />
        <view wx:elif="{{c && d}}" />
        <view wx:elif="{{c && d}}" />
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
        <view wx:if="{{n === 1}}" />
        <view wx:elif="{{n === 2}}" />
        <view wx:elif="{{n === 3}}" />
        <view wx:elif="{{n === 2}}" />
        <view wx:elif="{{n === 5}}" />
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
        <view wx:if="{{a || b}}" />
        <view wx:elif="{{a}}" />
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
        <view wx:if="{{a}}" />
        <view wx:elif="{{b}}" />
        <view wx:elif="{{a || b}}" />
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
        <view wx:if="{{a}}" />
        <view wx:elif="{{a && b}}" />
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
        <view wx:if="{{a && b}}" />
        <view wx:elif="{{a && b && c}}" />
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
        <view wx:if="{{a || b}}" />
        <view wx:elif="{{b && c}}" />
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
        <view wx:if="{{a}}" />
        <view wx:elif="{{b && c}}" />
        <view wx:elif="{{d && (c && e && b || a)}}" />
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
        <view wx:if="{{foo}}" />
        <view wx:elif="{{foo && bar}}" />
        <view wx:elif="{{baz && foo}}" />
      </template>
      `,
      errors: [
        {
          messageId: 'unexpected',
          line: 4,
          column: 26,
          endLine: 4,
          endColumn: 29
        },
        {
          messageId: 'unexpected',
          line: 5,
          column: 33,
          endLine: 5,
          endColumn: 36
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{a && b}}" />
        <view wx:elif="{{a && b && c}}" />
        <view wx:elif="{{a && c && b}}" />
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
        <view wx:if="{{a || b}}" />
        <view wx:elif="{{a}}" />
        <view wx:elif="{{b}}" />
      </template>
      `,
      errors: [
        { messageId: 'unexpected', line: 4 },
        { messageId: 'unexpected', line: 5 }
      ]
    },
    {
      filename: 'foo.mpx',
      code: `
      <template>
        <view wx:if      ="{{((f && e) || d) && c || (b && a)}}" />
        <view wx:elif ="{{(a && b) || (c && (d || (e && f)))}}" />
        <view wx:elif ="{{(a && b) || (c && (d || (e && f)))}}" />
      </template>
      `,
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },

    // Referred to the ESLint core rule.
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{a}}" /><view wx:elif="{{c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{b}}" /><view wx:elif="{{d}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{d}}" /><view wx:elif="{{b}}" /><view wx:elif="{{e}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{a}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{a}}" /></template>',
      errors: [
        { messageId: 'unexpected' },
        { messageId: 'unexpected' },
        { messageId: 'unexpected' }
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}"><view wx:if="{{b}}" /></view><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{a === 1}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{1 < a}}" /><view wx:elif="{{1 < a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{true}}" /><view wx:elif="{{true}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && b}}" /><view wx:elif="{{a && b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && b || c}}" /><view wx:elif="{{a && b || c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{a===1}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    // {
    //   filename: 'test.mpx',
    //   code: '<template><view wx:if="{{a === 1}}" /><view wx:elif="{{a === /* comment */ 1"}}/></template>',
    //   errors: [{ messageId: 'unexpected' }]
    // },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{a}}" /><view wx:elif="{{b}}" /></template>',
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{b || a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{a || b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{c || d}}" /><view wx:elif="{{a || d}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{(a === b && fn(c)) || d}}" /><view wx:elif="{{fn(c) && a === b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{a && b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && b}}" /><view wx:elif="{{a && b && c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || c}}" /><view wx:elif="{{a && b || c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c && a || b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c && (a || b)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b && c}}" /><view wx:elif="{{d && (a || e && c && b)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b && c}}" /><view wx:elif="{{b && c && d}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{b && c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{(a || b) && c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{(a && (b || c)) || d}}" /><view wx:elif="{{(c || b) && e && a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && b || b && c}}" /><view wx:elif="{{a && b && c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b && c}}" /><view wx:elif="{{d && (c && e && b || a)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || (b && (c || d))}}" /><view wx:elif="{{(d || c) && b}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{(b || a) && c}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{d}}" /><view wx:elif="{{b && (a || c)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b || c}}" /><view wx:elif="{{a || (b && d) || (c && e)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || (b || c)}}" /><view wx:elif="{{a || (b && c)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || b}}" /><view wx:elif="{{c}}" /><view wx:elif="{{d}}" /><view wx:elif="{{(a || c) && (b || d)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{b}}" /><view wx:elif="{{c && (a || d && b)}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{a || a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || a}}" /><view wx:elif="{{a || a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a || a}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a}}" /><view wx:elif="{{a && a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && a}}" /><view wx:elif="{{a && a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:if="{{a && a}}" /><view wx:elif="{{a}}" /></template>',
      errors: [{ messageId: 'unexpected' }]
    }
  ]
})
