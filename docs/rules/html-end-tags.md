---
pageClass: rule-details
sidebarDepth: 0
title: mpx/html-end-tags
description: 强制结束标记样式
---
# mpx/html-end-tags
> 强制结束标记样式

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。
- :wrench: `--fix`选项[命令行](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems)可以自动修复此规则报告的一些问题。

## :book: 规则详情

该规则旨在禁止缺少结束标记。

<eslint-code-block fix :rules="{'mpx/html-end-tags': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <view></view>
  <input />

  <!-- ✗ BAD -->
  <view>
  <input>
</template>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/comment-directive.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/html-end-tags.js)
