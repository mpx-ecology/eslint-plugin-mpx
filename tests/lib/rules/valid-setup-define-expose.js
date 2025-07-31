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
const rule = require('../../../lib/rules/valid-setup-define-expose')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  globals: {
    wx: 'readonly',
    my: 'readonly',
    __TEST_DEV__: 'readonly'
  }
})

tester.run('valid-setup-define-expose', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        import { ref } from '@mpx/core'
        // 正常导出检测
        const count = ref(0)
        const num = ref(0)
        const inc = () => {
          count.value++
        }
        const show = true
        defineExpose({
          show,
          num,
          inc
        })
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
        // 从非 @mpxjs/core 中导入的变量默认return
        import { count, inc } from './useCount'
       defineExpose({
        count,
        inc
       })
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
        import { ref } from '@mpx/core'
        const show = true
        const num = 1
        const inc = () => {}
        const expose = {
          show,
          num,
          inc
        }
        defineExpose({
          ...expose
        })
      </script>

      <template>
        <view wx:if="{{show}}" num="{{num}}" bindtap="inc" />
      </template>
      `
    },
    // 基础类型
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:if="{{true}}" num="{{0}}" str="{{'str'}}" str2="str2"/>
      </template>
      `
    },
    // wx:key wx:ref wx:for-item
    {
      filename: 'test.mpx',
      code: `
      <script setup>
      defineExpose({
        list: [1, 2, 3]
      })
      </script>
      <template>
        <view wx:ref="forref" wx:for-item="idx" wx:key="index" wx:for="{{list}}"/>
      </template>
      `
    },
    // item
    {
      filename: 'test.mpx',
      code: `
      <script setup>
      defineExpose({
        list: [1, 2, 3]
      })
      </script>
      <template>
        <view wx:key="index" wx:for="{{list}}" num="{{item}}"/>{{item}}</view>
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        import { ref } from '@mpx/core'
        const show = true
        const num = 1
        const inc = () => {}
        const expose = {
          show,
          num,
          inc
        }
        defineExpose(expose)
      </script>

      <template>
        <view wx:if="{{show}}" num="{{num}}" bindtap="inc" />
      </template>
      `
    },
    // defineOptions
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        import store from 'store'
        defineOptions({
          data: {
            count: 0
          },
          computed: {
            ...store.mapState(['update', 'del']),
            count2() {
              return count * 2
            }
          },
          methods: {
            inc() {
              this.count++
            }
          }
        })
      </script>

      <template>
        <view
          bindtap="inc"
          val="{{count2}}"
          update="{{update}}"
          del="{{del}}"
        >{{count}}</view>
      </template>
      `
    },
    // defineProps
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        defineProps({
          show: Boolean,
          num: {
            type: Number,
            value: 0
          }
        })
      </script>

      <template>
        <view wx:if="{{show}}" num="{{num}}"/>
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const props = withDefaults(defineProps(), {
          show: false,
          num: 0
        })
      </script>

      <template>
        <view wx:if="{{show}}" num="{{num}}"/>
      </template>
      `
    },
    // globals检测
    {
      filename: 'test.mpx',
      code: `
      <script setup>
      </script>

      <template>
        <view wx:if="{{__TEST_DEV__}}" />
      </template>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const inc = () => {
          count.value++
        }
        defineExpose({})
      </script>
      <template>
        <view bindtap="inc" />
      </template>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const inc = () => {
          count.value++
        }
      </script>
      <template>
        <view bindtap="inc" />
      </template>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const count = ref(0)
      </script>
      <template>
        <view>
          {{count}}
        </view>
      </template>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const count = ref(0)
      </script>
      <template>
        <view wx:if="{{name}}">
          {{count}}
        </view>
      </template>
      `,
      errors: [{ messageId: 'unexpected' }, { messageId: 'unexpected' }]
    }
  ]
})
