---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-call-expressions-in-template
description: 不允许在模板插值中使用方法调用（仅 web 端支持）
---
# mpx/no-call-expressions-in-template
> 不允许在模板插值中使用方法调用（仅 web 端支持）

## :book: 规则详情

Mpx 的模板插值 `{{ }}` 在 web 端支持完整的 JavaScript 表达式，但在小程序端仅支持简单的变量/属性访问，不支持方法调用。此规则用于检测模板插值中的方法调用并给出警告。

<eslint-code-block :rules="{'mpx/no-call-expressions-in-template': ['warn']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view>{{ name }}</view>
  <view>{{ list[0] }}</view>
  <view>{{ obj.a.b }}</view>

  <!-- ✗ BAD -->
  <view>{{ list.slice(0, n) }}</view>
  <view>{{ Math.random() }}</view>
  <view wx:for="{{ list.slice(0, n) }}" />
</template>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-call-expressions-in-template.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-call-expressions-in-template.js)
