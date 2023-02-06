---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-template-quote
description: 强制模版上使用规定的引号
---
# mpx/valid-template-quote
> 强制模版上使用规定的引号

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查 `template` 中是否使用规定的引号。

## :book: 规则详情

模版上的属性值应统一使用引号包裹，默认使用双引号.


<eslint-code-block :rules="{'mpx/valid-template-quote': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:if="{{test}}"></view>
  <view abc="test"></view>
  <view abc="1"></view>

  <!-- ✗ BAD -->
  <view wx:if='{{test}}'></view>
  <view abc='test'></view>
  <view abc=`test`></view>
  <view wx:if=1></view>

</template>
```
</eslint-code-block>

也可配置统一使用单引号

<eslint-code-block :rules="{'mpx/valid-template-quote': ['error', 1]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:if='{{test}}'></view>
  <view abc='test'></view>
  <view abc='1'></view>

  <!-- ✗ BAD -->
  <view wx:if="{{test}}"></view>
  <view abc="test"></view>
  <view abc=`test`></view>
  <view wx:if=1></view>

</template>
```

</eslint-code-block>

## :wrench: 选项

默认使用双引号，也可以如下显式指定
```json
{
  "mpx/valid-template-quote": ["error", 0]
},
// 或
{
  "mpx/valid-template-quote": ["error", "double"]
}
```

可配置使用单引号
```json
{
  "mpx/valid-template-quote": ["error", 1]
},
// 或
{
  "mpx/valid-template-quote": ["error", "single"]
}

```

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-template-quote.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-template-quote.js)
