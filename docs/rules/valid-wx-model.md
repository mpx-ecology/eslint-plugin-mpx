---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-wx-model
description: 强制执行有效的“wx:model”指令
---
# mpx/valid-wx-model
> 强制执行有效的“wx:model”指令

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查每个 `wx:model` 指令是否有效。

## :book: 规则详情

此规则在以下情况下报告 `wx:model` 指令：

- HTMLElement 上使用的指令有一个参数。 例如。 `<input wx:model:aaa="foo">`
- HTMLElement 上使用的指令具有不受支持的修饰符。 例如。 `<input wx:model.bbb="foo">`
- 该指令没有该属性值。 例如。 `<input wx:model>`
- 该指令具有潜在的空对象属性访问权限。 例如。 `<input wx:model="(a?.b).c">`
- 该指令适用于不受支持的元素。 例如。 `<view wx:model="foo"></view>`
- 该指令针对 `<input>` 元素，它们的类型是 `file`。 例如。 `<input type="file" wx:model="foo">`
- 指令的引用是迭代变量。 例如。 `<view wx:for="x in list"><input type="file" wx:model="x"></view>`

<eslint-code-block :rules="{'mpx/valid-wx-model': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <input wx:model="{{a}}">
  <input wx:model.lazy="{{a}}">
  <textarea wx:model="{{a}}"/>
  <MyComponent wx:model="{{a}}"/>
  <MyComponent wx:model:propName="{{a}}"/>
  <MyComponent wx:model.modifier="{{a}}"/>
  <MyComponent wx:model:propName.modifier="{{a}}"/>
  <view wx:for="todo in todos">
    <input wx:model="todo.name">
  </view>

  <!-- ✗ BAD -->
  <input wx:model>
  <input wx:model:aaa="{{a}}">
  <input wx:model.bbb="{{a}}">
  <input wx:model="{{a?.b.c}}">
  <input wx:model="{{(a?.b).c}}">
  <view wx:model="{{a}}"/>
  <view wx:for="todo in todos">
    <input wx:model="todo">
  </view>
</template>
```

</eslint-code-block>

## :wrench: 选项

无.

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-wx-model.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-wx-model.js)