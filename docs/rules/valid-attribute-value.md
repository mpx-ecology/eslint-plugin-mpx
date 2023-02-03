---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-attribute-value
description: 强制标签使用规范且有效的属性值
---
# mpx/valid-attribute-value
> 强制标签使用规范且有效的属性值

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查 `template` 中的每个节点的属性值是否有效。

## :book: 规则详情

节点属性应统一使用双引号包裹，且不允许使用无效值


<eslint-code-block :rules="{'mpx/valid-attribute-value': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view wx:if="id"></view>
  <view wx:else></view>
  <view abc="{{id}}"></view>
  <view abc="1"></view>
  <view abc></view>

  <!-- ✓ 不会报错，但不建议 -->
  <view abc=""></view>


  <!-- ✗ BAD -->
  <view wx:if='id'></view>
  <view wx:if=id></view>
  <view abc="{{}}"></view>
  <view abc="{{.}}"></view>


</template>
```

</eslint-code-block>

## :wrench: 选项

无。

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-attribute-value.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-attribute-value.js)
