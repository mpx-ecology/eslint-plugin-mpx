---
pageClass: rule-details
sidebarDepth: 0
title: mpx/return-in-computed-property
description: 强制返回语句存在于计算属性中
---
# mpx/return-in-computed-property
> 强制返回语句存在于计算属性中

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则强制在 `computed` 属性中存在 `return` 语句。

<eslint-code-block :rules="{'mpx/return-in-computed-property': ['error']}">

```vue
<script>
createComponent({
  computed: {
    /* ✓ GOOD */
    foo () {
      if (this.bar) {
        return this.baz
      } else {
        return this.baf
      }
    },
    bar: function () {
      return false
    },
    /* ✗ BAD */
    baz () {
      if (this.baf) {
        return this.baf
      }
    },
    baf: function () {}
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

```json
{
  "mpx/return-in-computed-property": ["error", {
    "treatUndefinedAsUnspecified": true
  }]
}
```

此规则有一个对象选项：
- `"treatUndefinedAsUnspecified"`: `true`（默认）不允许使用 `return` 语句隐式返回 undefined。

### `treatUndefinedAsUnspecified: false`

<eslint-code-block :rules="{'mpx/return-in-computed-property': ['error', { treatUndefinedAsUnspecified: false }]}">

```vue
<script>
createComponent({
  computed: {
    /* ✓ GOOD */
    foo () {
      if (this.bar) {
        return undefined
      } else {
        return
      }
    },
    bar: function () {
      return
    },
    /* ✗ BAD */
    baz () {
      if (this.baf) {
        return this.baf
      }
    },
    baf: function () {}
  }
})
</script>
```

</eslint-code-block>

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-side-effects-in-computed-properties.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-side-effects-in-computed-properties.js)
