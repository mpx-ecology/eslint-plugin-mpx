---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-swiper-item-style
description: 禁止`swiper-item`设置`动态style`
---
# mpx/valid-swiper-item-style
> 禁止`swiper-item`设置`动态style`

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查每个 `swiper-item` 节点有无`动态style`属性。

## :book: 规则详情

在微信小程序中不建议直接在`swiper-item`设置style。当`swiper-item`的`style`属性发生变化时，会丢失值，可能造成渲染异常。


<eslint-code-block :rules="{'mpx/valid-swiper-item-style': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <swiper-item></swiper-item>
  <swiper-item>
    <view style="{{viewStyle}}"></view>
  </swiper-item>

  <!-- ✗ BAD -->
  <swiper-item style="{{test}}"></swiper-item>
  <swiper-item wx:style="{{test}}"></swiper-item>
</template>
```

</eslint-code-block>

## :wrench: 选项

无。

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-swiper-item-style.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-swiper-item-style.js)
