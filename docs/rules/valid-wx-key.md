---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-wx-key
description: 强制执行有效的 `wx:key` 指令
---
# mpx/valid-wx-key
> 强制执行有效的 `wx:key` 指令

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查每个 `wx:key` 指令是否有效。

## :book: 规则详情

根据[wx:key规则](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html#wx:key)来保障key值有效性，限制使用静态字面量作为key值，且默认不允许使用如"index"、"this"等易混淆的保留关键字。

如果确定循环中存在item.index/item.this等保留关键字作为唯一key，可手动忽略报错。


<eslint-code-block :rules="{'mpx/valid-wx-key': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:for="{{list}}" wx:key="id"/>
  <view wx:for="{{list}}" wx:key="1"/>

  <!-- ✓ 不会报错，但不建议 -->
  <view wx:for="{{list}}" wx:key="*this"/>

  <!-- ✗ BAD -->
  <view wx:for="{{list}}"/>
  <view wx:for="{{list}}" wx:key="{{id}}"/>
  <view wx:for="{{list}}" wx:key="aaa.id"/>
  <view wx:for="{{list}}" wx:key="id_{{index}}"/>
  <view wx:for="{{list}}" wx:key:aaa="id"/>
  <view wx:for="{{list}}" wx:key=""/>
  <view wx:for="{{list}}"/>
  <view wx:key="id"/>
  <view wx:for="{{list}}" wx:key="index"/>
  <view wx:for="{{list}}" wx:key="this"/>
</template>
```

</eslint-code-block>

## :wrench: 选项
可配置keywords选项,自定义禁止使用保留的关键字,默认为"index"、"this"
```json
{
  "mpx/valid-template-quote": ["error", {
    "keywords": ["index", "this", "*this"] 
  }]
}
```

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-wx-key.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-wx-key.js)
