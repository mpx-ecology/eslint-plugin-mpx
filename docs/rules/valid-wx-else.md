---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-wx-else
description: 强制执行有效的 `wx:else` 指令
---
# mpx/valid-wx-else
> 强制执行有效的 `wx:else` 指令

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

该规则检查每个 `wx:else` 指令是否有效。

## :book: 规则详情

此规则在以下情况下报告 `wx:else` 指令：

- 该指令具有该参数。 例如。 `<view wx:if="foo"></view><view wx:else:aaa></view>`
- 该指令具有该修饰符。 例如。 `<view wx:if="foo"></view><view wx:else.bbb></view>`
- 该指令具有该属性值。 例如。 `<view wx:if="foo"></view><view wx:else="bar"></view>`
- 该指令针对前一个元素没有 `wx:if`/`wx:else-if` 指令的元素。 例如。 `<view wx:else></view>`
- 该指令针对具有 `wx:if`/`wx:else-if` 指令的元素。 例如。 `<view wx:if="foo" wx:else></view>`

<eslint-code-block :rules="{'mpx/valid-wx-else': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:if="{{a}}"/>
  <view wx:else/>

  <!-- ✗ BAD -->
  <view wx:else="{{a}}"/>
  <view wx:else:aaa/>
  <view wx:else.bbb/>
</template>
```

</eslint-code-block>

## :wrench: 选项

无.

## :couple: 相关规则

- [mpx/valid-wx-if]
- [mpx/valid-wx-elif]

[mpx/valid-wx-if]: ./valid-wx-if.md
[mpx/valid-wx-elif]: ./valid-wx-elif.md

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-wx-else.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-wx-else.js)
