---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-duplicate-attributes
description: 不允许重复属性
---
# mpx/no-duplicate-attributes
> 不允许重复属性

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

当存在重复参数时，只有最后一个是有效的。
很可能是错误。

## :book: 规则详情

此规则报告重复的属性。
`bindfoo` 指令作为属性 `foo` 处理。

<eslint-code-block :rules="{'mpx/no-duplicate-attributes': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <MyComponent bindfoo="abc" />
  <view foo="abc" />

  <!-- ✗ BAD -->
  <view foo="abc" foo="def" />
  <MyComponent foo="abc" foo="def" />
  <MyComponent class="abc" class="def" />
</template>
```

</eslint-code-block>

## :wrench: 选项

```json
{
  "mpx/no-duplicate-attributes": ["error"]
}
```

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-duplicate-attributes.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-duplicate-attributes.js)