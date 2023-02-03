---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-setup-define-expose
description: setup-script模式下，template中使用的变量必须导出
---
# mpx/valid-setup-define-expose
> setup-script模式下，template中使用的变量必须导出

- :gear: 这条规则包含在`"plugin:mpx/composition-api-essential"`。

## :book: 规则详情

<eslint-code-block :rules="{'mpx/valid-setup-define-expose': ['error']}">

```vue
<script setup>
  import { ref } from '@mpx/core'
  const count = ref(0)
  const num = ref(0)
  const inc = () => {
    count.value++
  }
  const show = true
  defineExpose({
    show,
    num,
    inc
  })
</script>

<template>
  <!-- ✓ GOOD -->
  <view wx:if="{{show}}" num="{{num}}" bindtap="inc" />
  <!-- ✗ BAD -->
  <view wx:if="{{noexpose}}" bindtap="method"> 
    {{ error }}
  </view>
</template>
```

</eslint-code-block>

## :wrench: 选项

无.

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-setup-define-expose.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-setup-define-expose.js)