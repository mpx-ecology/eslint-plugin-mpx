---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-deprecated-watch-second-param
description: watch第二个参数统一为函数，不再提供对象方式
---
# mpx/no-deprecated-watch-second-param
> watch第二个参数统一为函数，不再提供对象方式

- :gear: 这条规则包含在`"plugin:mpx/composition-api-essential"`。

## :book: 规则详情

mpx升级2.8版本之后，watch第二个参数统一为函数，不再提供对象方式

<eslint-code-block :rules="{'mpx/no-deprecated-watch-second-param': ['error']}">

```vue
<script setup>
import { ref, watch } from '@mpxjs/core'
const refValue = ref('')
 /* ✓ GOOD */
watch(refValue, () => {})
const handler = () => {}
watch(refValue, handler)
watch(refValue, () => {}, { immediate: true })
/* ✗ BAD */
watch(refValue, { handler() {} })
</script>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-deprecated-watch-second-param.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-deprecated-watch-second-param.js)