/**
 * @author xwd
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-call-expressions-in-template')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})

tester.run('no-call-expressions-in-template', rule, {
  valid: [
    // 纯变量引用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ name }}</view>
      </template>
      `
    },
    // 属性访问
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ list[0] }}</view>
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ obj.a.b }}</view>
      </template>
      `
    },
    // 字面量
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ 0 }}</view>
        <view>{{ 'str' }}</view>
        <view>{{ true }}</view>
      </template>
      `
    },
    // 无模板表达式
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view class="foo" />
      </template>
      `
    },
    // 事件绑定中的字符串值(非表达式)
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view bindtap="handleClick" />
      </template>
      `
    },
    // 未定义变量(其他规则处理)
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ count }}</view>
      </template>
      `
    },
    // withDefaults defineProps
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
        <view wx:if="{{show}}" num="{{num}}" />
      </template>
      `
    }
  ],
  invalid: [
    // 直接方法调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ list.slice(0, n) }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 逻辑表达式中的方法调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ list.slice(0, n) || defaultList }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 三元表达式中的方法调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ show ? list.slice(0, n) : list }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 属性绑定中的方法调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view wx:for="{{ list.slice(0, n) }}" />
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 全局函数调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ Math.random() }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // Date 调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ Date.now() }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 函数调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ getList() }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 链式调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>{{ list.filter(Boolean).map(fn) }}</view>
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    },
    // 属性值中的方法调用
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view num="{{ list.slice(0, 1) }}" />
      </template>
      `,
      errors: [{ messageId: 'unexpectedCall' }]
    }
  ]
})
