---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-side-effects-in-computed-properties
description: 不允许在computed中的副作用
---
# mpx/no-side-effects-in-computed-properties
> 不允许在computed中的副作用

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则旨在防止在computed中产生副作用的代码。

在计算属性中引入副作用被认为是一种非常糟糕的做法。 它使代码不可预测且难以理解。

<eslint-code-block :rules="{'mpx/no-side-effects-in-computed-properties': ['error']}">

```vue
<script>
/* ✓ GOOD */
createComponent({
  computed: {
    fullName () {
      return `${this.firstName} ${this.lastName}`
    },
    reversedArray () {
      return this.array.slice(0).reverse() // .slice makes a copy of the array, instead of mutating the orginal
    }
  }
})
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'mpx/no-side-effects-in-computed-properties': ['error']}">

```vue
<script>
/* ✗ BAD */
createComponent({
  computed: {
    fullName () {
      this.firstName = 'lorem' // <- side effect
      return `${this.firstName} ${this.lastName}`
    },
    reversedArray () {
      return this.array.reverse() // <- side effect - orginal array is being mutated
    }
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

无.

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-side-effects-in-computed-properties.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-side-effects-in-computed-properties.js)