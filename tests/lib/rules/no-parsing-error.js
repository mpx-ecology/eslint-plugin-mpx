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
const rule = require('../../../lib/rules/no-parsing-error')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('no-parsing-error', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: ''
    },
    {
      filename: 'test.mpx',
      code: '<template>a b c</template>'
    },
    {
      filename: 'test.mpx',
      code: '<template>{{a + b + c}}</template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><svg class="icon"><use xlink:href="#chevron"></use></svg></template>'
    },
    {
      filename: 'test.mpx',
      code: '<template><svg viewBox="0 0 40 40"></svg></template>'
    },
    {
      filename: 'test.mpx',
      code: '<table><tr><td></td></tr></table>'
    },
    {
      filename: 'test.mpx',
      code: '<a @click="foo(); bar()">link</a>'
    },
    {
      filename: 'test.mpx',
      code: `<template wx:for="x of list"><slot name="item" /></template>`
    },
    {
      code: `<template><!--></template>`,
      options: [{ 'abrupt-closing-of-empty-comment': false }]
    },
    {
      code: `<template><!---></template>`,
      options: [{ 'abrupt-closing-of-empty-comment': false }]
    },
    {
      code: `<template>&#qux;</template>`,
      options: [{ 'absence-of-digits-in-numeric-character-reference': false }]
    },
    {
      code: '<template><![CDATA[cdata]]></template>',
      options: [{ 'cdata-in-html-content': false }]
    },
    {
      code: '<template>&#1234567;</template>',
      options: [{ 'character-reference-outside-unicode-range': false }]
    },
    {
      code: '<template>\u0003</template>',
      options: [{ 'control-character-in-input-stream': false }]
    },
    {
      code: '<template>&#0003;</template>',
      options: [{ 'control-character-reference': false }]
    },
    {
      code: '<template><',
      options: [{ 'eof-before-tag-name': false }]
    },
    {
      code: '<template><svg><![CDATA[cdata',
      options: [{ 'eof-in-cdata': false }],
      errors: ['Parsing error: eof-in-cdata.']
    },
    {
      code: '<template><!--comment',
      options: [{ 'eof-in-comment': false }],
      errors: ['Parsing error: eof-in-comment.']
    },
    {
      code: '<template><view class=""',
      options: [{ 'eof-in-tag': false }]
    },
    {
      code: '<template><!--comment--!></template>',
      options: [{ 'incorrectly-closed-comment': false }]
    },
    {
      code: '<template><!ELEMENT br EMPTY></template>',
      options: [{ 'incorrectly-opened-comment': false }]
    },
    {
      code: '<template><👍>/template>',
      options: [{ 'invalid-first-character-of-tag-name': false }]
    },
    {
      code: '<template><view id=></template>',
      options: [{ 'missing-attribute-value': false }]
    },
    {
      code: '<template></></template>',
      options: [{ 'missing-end-tag-name': false }]
    },
    {
      code: '<template>&amp</template>',
      options: [{ 'missing-semicolon-after-character-reference': false }]
    },
    {
      code: '<template><view id="foo"class="bar"></template>',
      options: [{ 'missing-whitespace-between-attributes': false }]
    },
    {
      code: '<template><!--a<!--b--></template>',
      options: [{ 'nested-comment': false }]
    },
    {
      code: '<template>&#xFFFE;</template>',
      options: [{ 'noncharacter-character-reference': false }]
    },
    {
      code: '<template>\uFFFE</template>',
      options: [{ 'noncharacter-in-input-stream': false }]
    },
    {
      code: '<template>&#0000;</template>',
      options: [{ 'null-character-reference': false }]
    },
    {
      code: '<template>&#xD800;</template>',
      options: [{ 'surrogate-character-reference': false }]
    },
    {
      code: '<template>\uD800</template>',
      options: [{ 'surrogate-in-input-stream': false }]
    },
    {
      code: '<template><view a"bc=""></template>',
      options: [{ 'unexpected-character-in-attribute-name': false }]
    },
    {
      code: '<template><view foo=bar"></template>',
      options: [{ 'unexpected-character-in-unquoted-attribute-value': false }]
    },
    {
      code: '<template><view =foo></template>',
      options: [{ 'unexpected-equals-sign-before-attribute-name': false }]
    },
    {
      code: '<template>\u0000</template>',
      options: [{ 'unexpected-null-character': false }]
    },
    {
      code: '<template><?xml?></template>',
      options: [{ 'unexpected-question-mark-instead-of-tag-name': false }]
    },
    {
      code: '<template><view id="" / class=""></template>',
      options: [{ 'unexpected-solidus-in-tag': false }]
    },
    {
      code: '<template>&unknown;</template>',
      options: [{ 'unknown-named-character-reference': false }]
    },
    {
      code: '<template><view></view id=""></template>',
      options: [{ 'end-tag-with-attributes': false }]
    },
    {
      code: '<template><view id="" id=""></view></template>',
      options: [{ 'duplicate-attribute': false }]
    },
    {
      code: '<template><view></view/></template>',
      options: [{ 'end-tag-with-trailing-solidus': false }]
    },
    {
      code: '<template><view/></template>',
      options: [
        { 'non-void-html-element-start-tag-with-trailing-solidus': false }
      ]
    },
    {
      code: '<template></view></template>',
      options: [{ 'x-invalid-end-tag': false }],
      errors: ['Parsing error: x-invalid-end-tag.']
    },
    {
      code: '<template><view xmlns=""></template>',
      options: [{ 'x-invalid-namespace': false }]
    },
    '<template><view/></template>',
    '<template><view wx:show="">hello</view></template>',
    '<template><view>{{ }}</view></template>'
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<template>{{a b c}}</template>',
      errors: ['Parsing error: Unexpected token b.']
    },
    {
      filename: 'test.mpx',
      code: '<template><view>{{a b c}}</view></template>',
      errors: ['Parsing error: Unexpected token b.']
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:show="a b c">hello</view></template>',
      errors: ['Parsing error: Unexpected token b.']
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:show="a;b;">hello</view></template>',
      errors: ['Parsing error: Unexpected token ;.']
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:show=" ">hello</view></template>',
      errors: [
        {
          message:
            'Parsing error: Expected to be an expression, but got empty.',
          column: 26
        }
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="foo">hello</view></template>',
      errors: [
        { message: 'Parsing error: Unexpected end of expression.', column: 28 }
      ]
    },
    {
      filename: 'test.mpx',
      code: '<template><view wx:for="foo() in list">hello</view></template>',
      errors: [{ message: 'Parsing error: Unexpected token (.', column: 28 }]
    },
    {
      code: `<template><!--></template>`,
      options: [{ 'abrupt-closing-of-empty-comment': true }],
      errors: ['Parsing error: abrupt-closing-of-empty-comment.']
    },
    {
      code: `<template><!---></template>`,
      options: [{ 'abrupt-closing-of-empty-comment': true }],
      errors: ['Parsing error: abrupt-closing-of-empty-comment.']
    },
    {
      code: `<template>&#qux;</template>`,
      options: [{ 'absence-of-digits-in-numeric-character-reference': true }],
      errors: [
        'Parsing error: absence-of-digits-in-numeric-character-reference.'
      ]
    },
    {
      code: '<template><![CDATA[cdata]]></template>',
      options: [{ 'cdata-in-html-content': true }],
      errors: ['Parsing error: cdata-in-html-content.']
    },
    {
      code: '<template>&#1234567;</template>',
      options: [{ 'character-reference-outside-unicode-range': true }],
      errors: ['Parsing error: character-reference-outside-unicode-range.']
    },
    {
      code: '<template>\u0003</template>',
      options: [{ 'control-character-in-input-stream': true }],
      errors: ['Parsing error: control-character-in-input-stream.']
    },
    {
      code: '<template>&#0003;</template>',
      options: [{ 'control-character-reference': true }],
      errors: ['Parsing error: control-character-reference.']
    },
    {
      code: '<template><',
      options: [{ 'eof-before-tag-name': true }],
      errors: ['Parsing error: eof-before-tag-name.']
    },
    {
      code: '<template><svg><![CDATA[cdata',
      options: [{ 'eof-in-cdata': true }],
      errors: ['Parsing error: eof-in-cdata.']
    },
    {
      code: '<template><!--comment',
      options: [{ 'eof-in-comment': true }],
      errors: ['Parsing error: eof-in-comment.']
    },
    {
      code: '<template><view class=""',
      options: [{ 'eof-in-tag': true }],
      errors: ['Parsing error: eof-in-tag.']
    },
    {
      code: '<template><!--comment--!></template>',
      options: [{ 'incorrectly-closed-comment': true }],
      errors: ['Parsing error: incorrectly-closed-comment.']
    },
    {
      code: '<template><!ELEMENT br EMPTY></template>',
      options: [{ 'incorrectly-opened-comment': true }],
      errors: ['Parsing error: incorrectly-opened-comment.']
    },
    {
      code: '<template><👍>/template>',
      options: [{ 'invalid-first-character-of-tag-name': true }],
      errors: ['Parsing error: invalid-first-character-of-tag-name.']
    },
    {
      code: '<template><view id=></template>',
      options: [{ 'missing-attribute-value': true }],
      errors: ['Parsing error: missing-attribute-value.']
    },
    {
      code: '<template></></template>',
      options: [{ 'missing-end-tag-name': true }],
      errors: ['Parsing error: missing-end-tag-name.']
    },
    {
      code: '<template>&amp</template>',
      options: [{ 'missing-semicolon-after-character-reference': true }],
      errors: ['Parsing error: missing-semicolon-after-character-reference.']
    },
    {
      code: '<template><view id="foo"class="bar"></template>',
      options: [{ 'missing-whitespace-between-attributes': true }],
      errors: ['Parsing error: missing-whitespace-between-attributes.']
    },
    {
      code: '<template><!--a<!--b--></template>',
      options: [{ 'nested-comment': true }],
      errors: ['Parsing error: nested-comment.']
    },
    {
      code: '<template>&#xFFFE;</template>',
      options: [{ 'noncharacter-character-reference': true }],
      errors: ['Parsing error: noncharacter-character-reference.']
    },
    {
      code: '<template>\uFFFE</template>',
      options: [{ 'noncharacter-in-input-stream': true }],
      errors: ['Parsing error: noncharacter-in-input-stream.']
    },
    {
      code: '<template>&#0000;</template>',
      options: [{ 'null-character-reference': true }],
      errors: ['Parsing error: null-character-reference.']
    },
    {
      code: '<template>&#xD800;</template>',
      options: [{ 'surrogate-character-reference': true }],
      errors: ['Parsing error: surrogate-character-reference.']
    },
    {
      code: '<template>\uD800</template>',
      options: [{ 'surrogate-in-input-stream': true }],
      errors: ['Parsing error: surrogate-in-input-stream.']
    },
    {
      code: '<template><view a"bc=""></template>',
      options: [{ 'unexpected-character-in-attribute-name': true }],
      errors: ['Parsing error: unexpected-character-in-attribute-name.']
    },
    {
      code: '<template><view foo=bar"></template>',
      options: [{ 'unexpected-character-in-unquoted-attribute-value': true }],
      errors: [
        'Parsing error: unexpected-character-in-unquoted-attribute-value.'
      ]
    },
    {
      code: '<template><view =foo></template>',
      options: [{ 'unexpected-equals-sign-before-attribute-name': true }],
      errors: ['Parsing error: unexpected-equals-sign-before-attribute-name.']
    },
    {
      code: '<template>\u0000</template>',
      options: [{ 'unexpected-null-character': true }],
      errors: ['Parsing error: unexpected-null-character.']
    },
    {
      code: '<template><?xml?></template>',
      options: [{ 'unexpected-question-mark-instead-of-tag-name': true }],
      errors: ['Parsing error: unexpected-question-mark-instead-of-tag-name.']
    },
    {
      code: '<template><view id="" / class=""></template>',
      options: [{ 'unexpected-solidus-in-tag': true }],
      errors: ['Parsing error: unexpected-solidus-in-tag.']
    },
    {
      code: '<template>&unknown;</template>',
      options: [{ 'unknown-named-character-reference': true }],
      errors: ['Parsing error: unknown-named-character-reference.']
    },
    {
      code: '<template><view></view id=""></template>',
      options: [{ 'end-tag-with-attributes': true }],
      errors: ['Parsing error: end-tag-with-attributes.']
    },
    {
      code: '<template><view id="" id=""></view></template>',
      options: [{ 'duplicate-attribute': true }],
      errors: ['Parsing error: duplicate-attribute.']
    },
    {
      code: '<template><view></view/></template>',
      options: [{ 'end-tag-with-trailing-solidus': true }],
      errors: ['Parsing error: end-tag-with-trailing-solidus.']
    },
    // {
    //   code: '<template><view/></template>',
    //   options: [
    //     { 'non-void-html-element-start-tag-with-trailing-solidus': true }
    //   ],
    //   errors: [
    //     'Parsing error: non-void-html-element-start-tag-with-trailing-solidus.'
    //   ]
    // },
    {
      code: '<template></view></template>',
      options: [{ 'x-invalid-end-tag': true }],
      errors: ['Parsing error: x-invalid-end-tag.']
    },
    {
      code: '<template><view xmlns=""></template>',
      options: [{ 'x-invalid-namespace': true }],
      errors: ['Parsing error: x-invalid-namespace.']
    },
    {
      code: `<template><!--></template>`,
      errors: ['Parsing error: abrupt-closing-of-empty-comment.']
    },
    {
      code: `<template><!---></template>`,
      errors: ['Parsing error: abrupt-closing-of-empty-comment.']
    },
    {
      code: `<template>&#qux;</template>`,
      errors: [
        'Parsing error: absence-of-digits-in-numeric-character-reference.'
      ]
    },
    {
      code: '<template><![CDATA[cdata]]></template>',
      errors: ['Parsing error: cdata-in-html-content.']
    },
    {
      code: '<template>&#1234567;</template>',
      errors: ['Parsing error: character-reference-outside-unicode-range.']
    },
    {
      code: '<template>\u0003</template>',
      errors: ['Parsing error: control-character-in-input-stream.']
    },
    {
      code: '<template>&#0003;</template>',
      errors: ['Parsing error: control-character-reference.']
    },
    {
      code: '<template><',
      errors: ['Parsing error: eof-before-tag-name.']
    },
    {
      code: '<template><svg><![CDATA[cdata',
      errors: ['Parsing error: eof-in-cdata.']
    },
    {
      code: '<template><!--comment',
      errors: ['Parsing error: eof-in-comment.']
    },
    {
      code: '<template><view class=""',
      errors: ['Parsing error: eof-in-tag.']
    },
    {
      code: '<template><!--comment--!></template>',
      errors: ['Parsing error: incorrectly-closed-comment.']
    },
    {
      code: '<template><!ELEMENT br EMPTY></template>',
      errors: ['Parsing error: incorrectly-opened-comment.']
    },
    {
      code: '<template><👍>/template>',
      errors: ['Parsing error: invalid-first-character-of-tag-name.']
    },
    {
      code: '<template><view id=></template>',
      errors: ['Parsing error: missing-attribute-value.']
    },
    {
      code: '<template></></template>',
      errors: ['Parsing error: missing-end-tag-name.']
    },
    {
      code: '<template>&amp</template>',
      errors: ['Parsing error: missing-semicolon-after-character-reference.']
    },
    {
      code: '<template><view id="foo"class="bar"></template>',
      errors: ['Parsing error: missing-whitespace-between-attributes.']
    },
    {
      code: '<template><!--a<!--b--></template>',
      errors: ['Parsing error: nested-comment.']
    },
    {
      code: '<template>&#xFFFE;</template>',
      errors: ['Parsing error: noncharacter-character-reference.']
    },
    {
      code: '<template>\uFFFE</template>',
      errors: ['Parsing error: noncharacter-in-input-stream.']
    },
    {
      code: '<template>&#0000;</template>',
      errors: ['Parsing error: null-character-reference.']
    },
    {
      code: '<template>&#xD800;</template>',
      errors: ['Parsing error: surrogate-character-reference.']
    },
    {
      code: '<template>\uD800</template>',
      errors: ['Parsing error: surrogate-in-input-stream.']
    },
    {
      code: '<template><view a"bc=""></template>',
      errors: ['Parsing error: unexpected-character-in-attribute-name.']
    },
    {
      code: '<template><view foo=bar"></template>',
      errors: [
        'Parsing error: unexpected-character-in-unquoted-attribute-value.'
      ]
    },
    {
      code: '<template><view =foo></template>',
      errors: ['Parsing error: unexpected-equals-sign-before-attribute-name.']
    },
    {
      code: '<template>\u0000</template>',
      errors: ['Parsing error: unexpected-null-character.']
    },
    {
      code: '<template><?xml?></template>',
      errors: ['Parsing error: unexpected-question-mark-instead-of-tag-name.']
    },
    {
      code: '<template><view id="" / class=""></template>',
      errors: ['Parsing error: unexpected-solidus-in-tag.']
    },
    {
      code: '<template>&unknown;</template>',
      errors: ['Parsing error: unknown-named-character-reference.']
    },
    {
      code: '<template><view></view id=""></template>',
      errors: ['Parsing error: end-tag-with-attributes.']
    },
    {
      code: '<template><view id="" id=""></view></template>',
      errors: ['Parsing error: duplicate-attribute.']
    },
    {
      code: '<template><view></view/></template>',
      errors: ['Parsing error: end-tag-with-trailing-solidus.']
    },
    {
      code: '<template></view></template>',
      errors: ['Parsing error: x-invalid-end-tag.']
    },
    {
      code: '<template><view xmlns=""></template>',
      errors: ['Parsing error: x-invalid-namespace.']
    }
  ]
})
