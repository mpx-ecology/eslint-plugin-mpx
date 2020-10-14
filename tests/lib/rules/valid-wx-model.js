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
const rule = require('../../../lib/rules/valid-wx-model')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020 }
})

tester.run('valid-wx-model', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="foo"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="text" wx:model.lazy="foo"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="number" wx:model.number="foo"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="password" wx:model.trim="foo"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="checkbox" wx:model="foo.bar"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="radio" wx:model="foo"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><textarea wx:model="foo"></textarea></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><select wx:model="foo"></select></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><your-component wx:model="foo"></your-component></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="x.foo"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[x]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[x - 1]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[`${x}`]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[`prefix_${x}`]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[x ? x : \'_\']"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[x || \'_\']"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[x()]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[/r/.match(x) ? 0 : 1]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[typeof x]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="foo[tag`${x}`]"></view></view></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input :type="a" wx:model="b"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:bind:type="a" wx:model="b"></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><MyComponent wx:model:aaa="a"></MyComponent></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><MyComponent wx:model:aaa.modifier="a"></MyComponent></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><MyComponent wx:model.modifier="a"></MyComponent></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><MyComponent wx:model:aaa.modifier.modifierTwo="a"></MyComponent></template>'
    },
    {
      filename: 'test.mpx',
      code:
        '<template><MyComponent wx:model.modifier.modifierTwo="a"></MyComponent></template>'
    },
    // parsing error
    {
      filename: 'parsing-error.mpx',
      code: '<template><MyComponent wx:model="." /></template>'
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.mpx',
      code: '<template><MyComponent wx:model="/**/" /></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template><view wx:model="foo"></view></template>',
      errors: ["'wx:model' directives aren't supported on <view> elements."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model:aaa="foo"></template>',
      errors: ["'wx:model' directives require no argument."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model.aaa="foo"></template>',
      errors: ["'wx:model' directives don't support the modifier 'aaa'."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model></template>',
      errors: ["'wx:model' directives require that attribute value."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="a + b"></template>',
      errors: [
        "'wx:model' directives require the attribute value which is valid as LHS."
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><input type="file" wx:model="b"></template>',
      errors: ["'wx:model' directives don't support 'file' input type."]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="x"></view></view></template>',
      errors: [
        "'wx:model' directives cannot update the iteration variable 'x' itself."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="(x)"></view></view></template>',
      errors: [
        "'wx:model' directives cannot update the iteration variable 'x' itself."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="x in list"><input wx:model="(((x)))"></view></view></template>',
      errors: [
        "'wx:model' directives cannot update the iteration variable 'x' itself."
      ]
    },
    {
      filename: 'test.mpx',
      code:
        '<template><view><view wx:for="e in list"><input wx:model="e"></view></view></template>',
      errors: [
        "'wx:model' directives cannot update the iteration variable 'e' itself."
      ]
    },
    // empty value
    {
      filename: 'empty-value.mpx',
      code: '<template><MyComponent wx:model="" /></template>',
      errors: ["'wx:model' directives require that attribute value."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="foo?.bar"></template>',
      errors: ["Optional chaining cannot appear in 'wx:model' directives."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="foo?.bar.baz"></template>',
      errors: ["Optional chaining cannot appear in 'wx:model' directives."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="(a?.b)?.c"></template>',
      errors: ["Optional chaining cannot appear in 'wx:model' directives."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="(a?.b).c"></template>',
      errors: ["'wx:model' directive has potential null object property access."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="(null).foo"></template>',
      errors: ["'wx:model' directive has potential null object property access."]
    },
    {
      filename: 'test.mpx',
      code: '<template><input wx:model="(a?.b).c.d"></template>',
      errors: ["'wx:model' directive has potential null object property access."]
    }
  ]
})
