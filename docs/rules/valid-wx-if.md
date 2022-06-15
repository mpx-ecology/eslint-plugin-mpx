---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-wx-if
description: 强制执行有效的 `wx:if` 指令
---
# mpx/valid-wx-if
> 强制执行有效的 `wx:if` 指令

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查每个 `wx:if` 指令是否有效。

## :book: 规则详情

此规则在以下情况下报告 `wx:if` 指令：

- 该指令具有该参数。 例如。 `<view wx:if:aaa="{{a}}"></view>`
- 该指令具有该修饰符。 例如。 `<view wx:if.bbb="{{a}}"></view>`
- 该指令没有该属性值。 例如。 `<view wx:if></view>`
- 该指令适用于具有 `wx:else`/`wx:elif` 指令的元素。 例如。 `<view wx:else wx:if="{{a}}"></view>`

<eslint-code-block :rules="{'mpx/valid-wx-if': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:if="{{a}}"/>
  <view wx:elif="{{b}}"/>
  <view wx:else/>

  <!-- ✗ BAD -->
  <view wx:if/>
  <view wx:if:aaa="{{a}}"/>
  <view wx:if.bbb="{{a}}"/>
  <view
    wx:if="{{a}}"
    wx:else
  />
  <view
    wx:if="{{a}}"
    wx:elif="{{b}}"
  />
</template>
```

</eslint-code-block>

## :wrench: 选项

无。

## :couple: 相关规则

- [mpx/valid-wx-else]
- [mpx/valid-wx-elif]

[mpx/valid-wx-else]: ./valid-wx-else.md
[mpx/valid-wx-elif]: ./valid-wx-elif.md

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-wx-if.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-wx-if.js)
