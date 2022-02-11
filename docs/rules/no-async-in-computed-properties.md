---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-async-in-computed-properties
description: 不允许计算属性中的异步操作
---
# mpx/no-async-in-computed-properties
> 不允许计算属性中的异步操作

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

计算属性应该是同步的。它们内部的异步操作可能无法按预期工作，并可能导致意外行为，这就是为什么应该避免它们。

## :book: 规则详情

此规则旨在防止在计算属性中调用异步方法。

<eslint-code-block :rules="{'mpx/no-async-in-computed-properties': ['error']}">

```vue
<script>
createComponent({
  computed: {
    /* ✓ GOOD */
    foo () {
      var bar = 0
      try {
        bar = bar / this.a
      } catch (e) {
        return 0
      } finally {
        return bar
      }
    },

    /* ✗ BAD */
    pro () {
      return Promise.all([new Promise((resolve, reject) => {})])
    },
    foo1: async function () {
      return await someFunc()
    },
    bar () {
      return fetch(url).then(response => {})
    },
    tim () {
      setTimeout(() => { }, 0)
    },
    inter () {
      setInterval(() => { }, 0)
    },
    anim () {
      requestAnimationFrame(() => {})
    }
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-async-in-computed-properties.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-async-in-computed-properties.js)
