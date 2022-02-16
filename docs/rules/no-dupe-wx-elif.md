---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-dupe-wx-elif
description: 在'wx:if`/'wx:elif`链中不允许重复
---
# mpx/no-dupe-wx-elif
> 在'wx:if`/'wx:elif`链中不允许重复

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则不允许在同一个`wx:if`/`wx:elif`链中重复条件。

<eslint-code-block :rules="{'mpx/no-dupe-wx-elif': ['error']}">

```vue
<template>
  <!-- ✗ BAD -->
  <view wx:if="{{a}}" />
  <view wx:elif="{{b}}" />
  <view wx:elif="{{c && d}}" />
  <view wx:elif="{{c && d}}" />

  <view wx:if="{{n === 1}}" />
  <view wx:elif="{{n === 2}}" />
  <view wx:elif="{{n === 3}}" />
  <view wx:elif="{{n === 2}}" />
  <view wx:elif="{{n === 5}}" />

  <!-- ✓ GOOD -->
  <view wx:if="{{a}}" />
  <view wx:elif="{{b}}" />
  <view wx:elif="{{c && d}}" />
  <view wx:elif="{{c && e}}" />

  <view wx:if="{{n === 1}}" />
  <view wx:elif="{{n === 2}}" />
  <view wx:elif="{{n === 3}}" />
  <view wx:elif="{{n === 4}}" />
  <view wx:elif="{{n === 5}}" />
</template>
```

</eslint-code-block>

此规则还可以检测某些情况，其中条件不相同，但由于`| ``和`&&`运算符的逻辑，分支永远无法执行。

<eslint-code-block :rules="{'mpx/no-dupe-wx-elif': ['error']}">

```vue
<template>
  <!-- ✗ BAD -->
  <view wx:if="{{a || b}}" />
  <view wx:elif="{{a}}" />

  <view wx:if="{{a}}" />
  <view wx:elif="{{b}}" />
  <view wx:elif="{{a || b}}" />

  <view wx:if="{{a}}" />
  <view wx:elif="{{a && b}}" />

  <view wx:if="{{a && b}}" />
  <view wx:elif="{{a && b && c}}" />

  <view wx:if="{{a || b}}" />
  <view wx:elif="{{b && c}}" />

  <view wx:if="{{a}}" />
  <view wx:elif="{{b && c}}" />
  <view wx:elif="{{d && (c && e && b || a)}}" />
</template>
```

</eslint-code-block>

## :wrench: 选项

无

## :couple: 相关规则

- [no-dupe-else-if]

[no-dupe-else-if]: https://eslint.org/docs/rules/no-dupe-else-if

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-dupe-wx-elif.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-dupe-wx-elif.js)