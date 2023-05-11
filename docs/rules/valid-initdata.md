---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-initdata
description: setup-script 和 普通模式下，检测动态数据是否有initData声明
---
# mpx/valid-initdata
> setup-script 和 普通模式下，检测动态数据是否有initData声明

- :gear: 这条规则包含在`"plugin:mpx/composition-api-essential"`。

## :book: 规则详情

<eslint-code-block :rules="{'mpx/valid-initdata': ['error']}">

```vue
<!-- 普通 -->
<script>
    createComponent({
        initData: {
            show: true,
            num: 0,
            inc: 0
        },
        computed: {
            ...store.mapState(['count', 'num']),
            inc() {
                return 0
            }
        }
    })
</script>
<!-- setup -->
<script setup>
  import { ref } from '@mpx/core'
  const count = ref(0)
  const num = ref(0)
  const inc = () => {
    count.value++
  }
  const show = true
  defineOptions({
    initData: {
        show: true,
        num: 0,
        inc: 0
    }
  })
  defineExpose({
    show,
    num,
    inc
  })
</script>

<template>
  <view show="{{show}}" num="{{num}}" inc="{{inc}}" />
</template>
```

</eslint-code-block>

## :wrench: 选项

无.

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-initdata.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-initdata.js)