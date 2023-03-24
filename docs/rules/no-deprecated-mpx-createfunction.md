---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-deprecated-mpx-createfunction
description: mpx.create调用方式已经被废弃
---
# mpx/no-deprecated-mpx-createfunction
> mpx.create调用方式已经被废弃

- :gear: 这条规则包含在`"plugin:composition-api-essential"`。

## :book: 规则详情

mpx升级2.8版本之后，mpx.create*调用方式已经被废弃

<eslint-code-block :rules="{'mpx/no-deprecated-mpx-createfunction': ['error']}">

```vue
<script>
import { createComponent } from '@mpxjs/core'
/* ✓ GOOD */
createComponent({})
/* ✗ BAD */
mpx.createComponent({})
</script>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-deprecated-mpx-createfunction.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-deprecated-mpx-createfunction.js)