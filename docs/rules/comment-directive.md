---
pageClass: rule-details
sidebarDepth: 0
title: mpx/comment-directive
description: 支持 `<template>` 中的注释指令
---
# mpx/comment-directive
> 支持 `<template>` 中的注释指令

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则的唯一目的是在`<template>`和块级别提供 eslint-disable 功能。 它支持使用以下注释：

- `eslint-disable`
- `eslint-enable`
- `eslint-disable-line`
- `eslint-disable-next-line`

::: warning Note
我们不能在标签中写 HTML 注释。
:::

## :book: 规则详情

ESLint 不提供任何 API 来增强 `eslint-disable` 功能，并且 ESLint 规则不会影响其他规则。 但是 ESLint 提供了 [处理器 API](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins).

该规则将所有类似于`eslint-disable`的评论作为错误发送到`.mpx`文件处理器的后处理，然后后处理删除所有`mpx/comment-directive`错误和禁用区域中报告的错误。

<eslint-code-block :rules="{'mpx/comment-directive': ['error'], 'mpx/valid-wx-if': ['error']}">

```vue
<template>
  <!-- eslint-disable-next-line mpx/valid-wx-if -->
  <view wx:if=""/>
</template>
```

</eslint-code-block>

类似`eslint-disable`的注释可以在`<template>`和块级中使用。

<eslint-code-block :rules="{'mpx/comment-directive': ['error'], 'mpx/valid-wx-if': ['error'], 'mpx/component-tags-order': ['error']}">

```vue
<template>
  <!-- eslint-disable-next-line mpx/valid-wx-if -->
  <view wx:if=""/>
</template>

<!-- eslint-disable-next-line mpx/component-tags-order -->
<style>
</style>
```

</eslint-code-block>

`eslint-disable` 注释在一个块后无效。

<eslint-code-block :rules="{'mpx/comment-directive': ['error'], 'mpx/component-tags-order': ['error']}">

```vue
<style>
</style>

<!-- eslint-disable -->
<script> /* <- Warning has been disabled. */
</script>

<template> <!-- <- Warning are not disabled. -->
</template>

```

</eslint-code-block>

类似`eslint-disable`的注释可以包括解释为什么需要注释的描述。 描述必须出现在指令之后，并由两个或多个连续的 - 字符与指令隔开。 例如：

<eslint-code-block :rules="{'mpx/comment-directive': ['error'], 'mpx/valid-wx-if': ['error']}">

```vue
<template>
  <!-- eslint-disable-next-line mpx/valid-wx-if -- 这是关于为什么需要禁用此功能的说明。 -->
  <view wx:if=""/>
</template>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "mpx/comment-directive": ["error", {
    "reportUnusedDisableDirectives": false
  }]
}
```

- `reportUnusedDisableDirectives` ... 如果为 `true`，报告未使用的 `eslint-disable` HTML 注释。 默认`false`

### `{ "reportUnusedDisableDirectives": true }`

<eslint-code-block :rules="{'mpx/comment-directive': ['error', {reportUnusedDisableDirectives: true} ], 'mpx/valid-wx-if': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <!-- eslint-disable-next-line mpx/valid-wx-if -->
  <view wx:if=""/>

  <!-- ✗ BAD -->
  <!-- eslint-disable-next-line mpx/valid-wx-if -->
  <view wx:if="{{abc}}"/>
</template>
```

</eslint-code-block>

::: warning Note
无法使用 `eslint-disable` HTML 注释禁止未使用的报告。
:::

## :books: 延伸阅读

- [使用内联注释禁用规则]

[使用内联注释禁用规则]: https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/comment-directive.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/comment-directive.js)
