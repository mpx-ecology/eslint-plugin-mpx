/**
 * @fileoverview Prevent `<script setup>` variables used in `<template>` to be marked as unused
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const eslint = require('eslint')
const rule = require('../../../lib/rules/script-setup-uses-vars')
const ruleNoUnusedVars = new (require('eslint').Linter)()
  .getRules()
  .get('no-unused-vars')

const RuleTester = eslint.RuleTester
const ruleTester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})

const linter = ruleTester.linter || eslint.linter
linter.defineRule('script-setup-uses-vars', rule)

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('script-setup-uses-vars', () => {
  ruleTester.run('no-unused-vars', ruleNoUnusedVars, {
    valid: [
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          import { ref } from '@mpx/core'

          // write Composition API code just like in a normal setup()
          // but no need to manually return everything
          const count = ref(0)
          const num = ref(0)
          const inc = () => {
            count.value++
          }
          const show = true
        </script>

        <template>
          <view wx:if="{{show}}" num="{{num}}" bindtap="inc" />
        </template>
        `
      },
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          // 从非 @mpxjs/core 中导入的变量默认return
          import { count, inc } from './useCount'
         
        </script>

        <template>
          <view bindtap="inc" >{{count}}</view>
        </template>
        `
      },
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          const msg = 'Hello!'
        </script>

        <template>
          <view>{{ msg }}</view>
        </template>
        `
      },
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          const a = 1
          const b = 2
          const show = true
        </script>

        <template>
          <view wx:if="{{show? a : b}}" />
        </template>
        `
      },

      // TopLevel await
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          const post = await fetch(\`/api/post/1\`).then((r) => r.json())
        </script>

        <template>
          {{post}}
        </template>
        `,
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module'
        }
      }
    ],

    invalid: [
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          import { ref, reactive } from '@mpx/core'

          // write Composition API code just like in a normal setup()
          // but no need to manually return everything
          const count = ref(0)
          const num = ref(0)
          const inc = () => {
            count.value++
          }
          const show = true
        </script>

        <template>
          <view bindtap="inc" />
        </template>
        `,
        errors: [
          {
            message: "'reactive' is defined but never used.",
            line: 4
          },
          {
            message: "'num' is assigned a value but never used.",
            line: 9
          },
          {
            message: "'show' is assigned a value but never used.",
            line: 13
          }
        ]
      },
      // Scope tests
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          if (a) {
            const msg = 'Hello!'
          }
        </script>
        <template>
          <div>{{ msg }}</div>
        </template>
        `,
        errors: [
          {
            message: "'msg' is assigned a value but never used.",
            line: 5
          }
        ]
      },
      {
        filename: 'test.mpx',
        code: `
        <script setup>
          /* eslint script-setup-uses-vars: 1 */
          const i = 42
          const list = [1,2,3]
        </script>
        <template>
          <div wx:for="{{list}}"></div>
        </template>
      `,
        errors: [
          {
            message: "'i' is assigned a value but never used.",
            line: 4
          }
        ]
      },
      // Not `<script setup>`
      {
        filename: 'test.mpx',
        code: `
        <script>
          /* eslint script-setup-uses-vars: 1 */
          const msg = 'Hello!'
        </script>
        <template>
          <div>{{ msg }}</div>
        </template>
        `,
        errors: [
          {
            message: "'msg' is assigned a value but never used.",
            line: 4
          }
        ]
      }
    ]
  })
})
