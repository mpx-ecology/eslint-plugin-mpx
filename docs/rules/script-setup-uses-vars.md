---
pageClass: rule-details
sidebarDepth: 0
title: mpx/script-setup-uses-vars
description: 防止`<script setup>`在`<template>`中使用的变量标记为未使用
since: v0.2.1
---
# mpx/script-setup-uses-vars

> 防止`<script setup>`在`<template>`中使用的变量标记为未使用(已废弃，因为强制在`<script setup>`使用`defineExpose`导出变量)

- :warning: 此规则已被**弃用**。

ESLint“无未使用的变量”规则不检测“＜script setup＞”中用于“＜template＞”的变量。

此规则将在“＜script setup＞”中查找在“＜template＞”中使用的变量，并将其标记为已使用。

此规则仅在启用“无未使用的变量”规则时有效。

## :book: 规则详情

如果没有此规则，此代码将触发警告：

<eslint-code-block :rules="{'mpx/script-setup-uses-vars': ['error'], 'no-unused-vars': ['error']}">

```vue
<script setup>
  import { ref } from 'vue'

  // 像在普通设置（）中一样编写Composition API代码
  // 但无需手动返回所有内容
  const count = ref(0)
  const inc = () => {
    count.value++
  }
</script>

<template>
  <view count="{{ count }}" bindclick="inc" />
</template>
```

</eslint-code-block>

打开后，“no used vars”规则不会报告问题。

## :mute: 何时不使用

您可以在以下任何情况下禁用此规则：

- 您没有使用“＜script setup＞”。

- 您不使用“无未使用的变量”规则。

## :couple: 相关规则

- [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)

## :rocket: 版本

此规则是在eslint-plugin vue v0.2.1中引入的

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/script-setup-uses-vars.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/master/tests/lib/rules/script-setup-uses-vars.js)
