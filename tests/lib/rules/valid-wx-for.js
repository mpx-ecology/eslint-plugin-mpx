/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/valid-wx-for')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-wx-for', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:for="x in list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:for="x of list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(x, i, k) in list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(x, i, k) of list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="({id, name}, i, k) of list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="([id, name], i, k) of list"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><your-component wx:for="x in list" :key="x.id"></your-component></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view is="your-component" wx:for="x in list" :key="x.id"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view :is="your-component" wx:for="x in list" :key="x.id"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x in list"><custom-component :key="x"></custom-component></template></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x in list"><view :key="x"></view></template></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x in list"><view></view></template></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><template wx:for="x of list"><slot name="item" /></template></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><template wx:for="x of list">foo<view></view></template></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x of list"><view wx:for="foo of x" :key="foo"></view></template></view></template>'
    },
    {
      filename: 'test.mpx',
      code: `
        <template>
          <template wx:for="x in xs">
            <template wx:for="y in x.ys">
              <li wx:for="z in y.zs" :key="z.id">
                123
              </li>
            </template>
          </template>
        </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
        <template>
          <template wx:for="x in xs">
            <template wx:for="y in ys">
              <li wx:for="z in zs" :key="x.id + y.id + z.id">
                123
              </li>
            </template>
          </template>
        </template>
      `
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code: '<template><view wx:for="."></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="xin list"><view></view></template></view></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code: '<template><view wx:for="/**/"></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:for:aaa="x in list"></view></view></template>',
      errors: ["'wx:for' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:for.aaa="x in list"></view></view></template>',
      errors: ["'wx:for' directives require no modifier."]
    },
    {
      filename: 'test.mpx',
      code: '<template><view><view wx:for></view></view></template>',
      errors: ["'wx:for' directives require that attribute value."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(,a,b) in list"></view></view></template>',
      errors: ["Invalid alias ''."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(a,,b) in list"></view></view></template>',
      errors: ["Invalid alias ''."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(a,b,,) in list"></view></view></template>',
      errors: ["Invalid alias ''."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(a,{b,c}) in list"></view></view></template>',
      errors: ["Invalid alias '{b,c}'."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(a,b,{c,d}) in list"></view></view></template>',
      errors: ["Invalid alias '{c,d}'."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><your-component wx:for="x in list"></your-component></view></template>',
      errors: ["Custom elements in iteration require 'wx:bind:key' directives."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view is="your-component" wx:for="x in list"></view></view></template>',
      errors: ["Custom elements in iteration require 'wx:bind:key' directives."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view :is="your-component" wx:for="x in list"></view></view></template>',
      errors: ["Custom elements in iteration require 'wx:bind:key' directives."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:bind:is="your-component" wx:for="x in list"></view></view></template>',
      errors: ["Custom elements in iteration require 'wx:bind:key' directives."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list" :key="100"></view></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><custom-component wx:for="x in list" :key="100"></custom-component></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list" :key="foo"></view></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><custom-component wx:for="x in list" :key="foo"></custom-component></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="(item, index) in suggestions" :key></view></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x in list" :key="x"><custom-component></custom-component></template></view></template>',
      errors: ["Custom elements in iteration require 'wx:bind:key' directives."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><template wx:for="x of list"><view wx:for="foo of y" :key="foo"></view></template></view></template>',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ]
    },
    {
      filename: 'test.mpx',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ],
      code: `
        <template>
          <template wx:for="x in xs">
            <template wx:for="y in a.ys">
              <li wx:for="z in y.zs" :key="z.id">
                123
              </li>
            </template>
          </template>
        </template>
      `
    },
    {
      filename: 'test.mpx',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ],
      code: `
        <template>
          <template wx:for="x in xs">
            <template wx:for="y in x.ys">
              <li wx:for="z in a.zs" :key="z.id">
                123
              </li>
            </template>
          </template>
        </template>
      `
    },
    {
      filename: 'test.mpx',
      errors: [
        "Expected 'wx:bind:key' directive to use the variables which are defined by the 'wx:for' directive."
      ],
      code: `
        <template>
          <template wx:for="x in xs">
            <template wx:for="y in x.ys">
              <li wx:for="z in x.zs" :key="z.id">
                123
              </li>
            </template>
          </template>
        </template>
      `
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><view wx:for=""></view></template>',
      errors: ["'wx:for' directives require that attribute value."]
    }
  ]
})
