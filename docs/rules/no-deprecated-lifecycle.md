---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-deprecated-lifecycle
description: pageShow/pageHide废弃的生命周期
---
# mpx/no-deprecated-lifecycle
> pageShow/pageHide废弃的生命周期

- :gear: 这条规则包含在`"plugin:mpx/composition-api-essential"`。

## :book: 规则详情

mpx升级2.8版本之后，pageShow/pageHide将废弃

<eslint-code-block :rules="{'mpx/no-deprecated-lifecycle': ['error']}">

```vue
<script>
/* ✓ GOOD */
createComponent({
  pageLifetimes: {
    show() {},
    hide() {}
  }
})
/* ✗ BAD */
createComponent({
  pageShow () {},
  pageHide () {}
})
</script>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-deprecated-lifecycle.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-deprecated-lifecycle.js)