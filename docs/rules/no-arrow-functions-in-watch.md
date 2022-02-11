---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-arrow-functions-in-watch
description: 不允许使用箭头函数定义观察者
---
# mpx/no-arrow-functions-in-watch
> 不允许使用箭头函数定义观察者

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则不允许使用箭头函数定义观察者。原因是箭头函数绑定父上下文，所以“this”不会像您预期的那样成为Mpx实例

<eslint-code-block :rules="{'mpx/no-arrow-functions-in-watch': ['error']}">

```vue
<script>
createComponent({
  watch: {
    /* ✓ GOOD */
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    b: 'someMethod',
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    d: {
      handler: 'someMethod',
      immediate: true
    },
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    'e.f': function (val, oldVal) { /* ... */ },

    /* ✗ BAD */
    foo: (val, oldVal) => {
      console.log('new: %s, old: %s', val, oldVal)
    }
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

无

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-arrow-functions-in-watch.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-arrow-functions-in-watch.js)