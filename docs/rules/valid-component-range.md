---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-component-range
description: 强制`component`节点使用`range`指定组件范围
---
# mpx/valid-component-range
> 强制`component`节点使用`range`指定组件范围

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查 `component` 动态组件必须添加`range`属性指定组件范围。

## :book: 规则详情

为 `component` 动态组件指定组件范围，在未来也许能够辅助mpx更精准地校验冗余组件


<eslint-code-block :rules="{'mpx/valid-component-range': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <component is="{{abc}}" range="abc,a_cd" />
  <component is="abc" range="abc" />
  <component is="abc" range@wx="abc" />

  <!-- ✗ BAD -->
  <component />
  <component is="abc"/>
  <component is="abc" range/>

</template>
```

</eslint-code-block>

## :wrench: 选项

无。

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-component-range.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-component-range.js)
