---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-parsing-error
description: 禁止 `<template>` 中的解析错误
---
# mpx/no-parsing-error
> 禁止 `<template>` 中的解析错误

- :gear: 此规则包含在所有“插件：mpx/mpx-essential”中。

此规则报告 `<template>` 中的语法错误。 例如：

- 指令中脚本的语法错误。
- mustaches中脚本的语法错误。
- HTML 的语法错误。
    - 无效的结束标签。
    - 结束标签中的属性。
    - ...
    - 另请参阅: [WHATWG HTML spec](https://html.spec.whatwg.org/multipage/parsing.html#parse-errors)

## :book: 规则详情

此规则尝试通过解析 `<script>` 的解析器解析 `<template>` 中的指令/mustaches
然后报告语法错误（如果存在）

<eslint-code-block :rules="{'mpx/no-parsing-error': ['error']}">

```vue
<template>
  <!-- ✗ BAD -->
  {{ . }}
  {{ foo bar }}
  <div :class="*abc*" / @click="def(">
    </span>
  </div id="ghi">
</template>
```

</eslint-code-block>

## :wrench: 选项

```json
{
  "mpx/no-parsing-error": ["error", {
    "abrupt-closing-of-empty-comment": true,
    "absence-of-digits-in-numeric-character-reference": true,
    "cdata-in-html-content": true,
    "character-reference-outside-unicode-range": true,
    "control-character-in-input-stream": true,
    "control-character-reference": true,
    "eof-before-tag-name": true,
    "eof-in-cdata": true,
    "eof-in-comment": true,
    "eof-in-tag": true,
    "incorrectly-closed-comment": true,
    "incorrectly-opened-comment": true,
    "invalid-first-character-of-tag-name": true,
    "missing-attribute-value": true,
    "missing-end-tag-name": true,
    "missing-semicolon-after-character-reference": true,
    "missing-whitespace-between-attributes": true,
    "nested-comment": true,
    "noncharacter-character-reference": true,
    "noncharacter-in-input-stream": true,
    "null-character-reference": true,
    "surrogate-character-reference": true,
    "surrogate-in-input-stream": true,
    "unexpected-character-in-attribute-name": true,
    "unexpected-character-in-unquoted-attribute-value": true,
    "unexpected-equals-sign-before-attribute-name": true,
    "unexpected-null-character": true,
    "unexpected-question-mark-instead-of-tag-name": true,
    "unexpected-solidus-in-tag": true,
    "unknown-named-character-reference": true,
    "end-tag-with-attributes": true,
    "duplicate-attribute": true,
    "end-tag-with-trailing-solidus": true,
    "non-void-html-element-start-tag-with-trailing-solidus": false,
    "x-invalid-end-tag": true,
    "x-invalid-namespace": true
  }]
}
```

185 / 5,000
翻译结果
您可以通过选项禁用 HTML 语法错误。 请参阅 [WHATWG HTML 规范](https://html.spec.whatwg.org/multipage/parsing.html#parse-errors) 了解 HTML 语法错误的详细信息。

::: warning Note
此规则不支持所有这些（例如，它不会捕获有关 DOCTYPE 的错误）。
:::

带有`x-`前缀的错误代码是该规则的原始代码，因为树构建阶段的错误尚未编码。

- `x-invalid-end-tag` 启用关于未打开元素的结束标签的错误。
- `x-invalid-namespace` 启用有关无效 `xmlns` 属性的错误。 另请参阅 [“为令牌创建元素”的第 10 步](https://html.spec.whatwg.org/multipage/parsing.html#create-an-element-for-the-token)。

## :books: 延伸阅读

- [WHATWG HTML spec](https://html.spec.whatwg.org/multipage/parsing.html#parse-errors)

## :mag: 具体实现

- [Rule source](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-parsing-error.js)
- [Test source](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-parsing-error.js)
