---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-reserved-keys
description: 不允许覆盖保留关键词
---
# mpx/no-reserved-keys
> 不允许覆盖保留关键词

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则防止使用[保留关键词](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/utils/mpx-reserved.json)以避免冲突和意外行为。

<eslint-code-block :rules="{'mpx/no-reserved-keys': ['error']}">

```vue
<script>
/* ✗ BAD */
createComponent({
  computed: {
    $on: {
      get () {}
    }
  },
  data: {
    _foo: null
  },
  methods: {
    $nextTick () {}
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

```json
{
  "mpx/no-reserved-keys": ["error", {
    "reserved": [],
    "groups": []
  }]
}
```

- `reserved` (`string[]`) ... `groups` 中的附加受限属性数组。 默认为空。
- `groups` (`string[]`) ... 用于在其中搜索重复项的其他组名数组。默认为空。

### `"reserved": ["foo", "foo2"], "groups": ["firebase"]`

<eslint-code-block :rules="{'mpx/no-reserved-keys': ['error', {reserved: ['foo', 'foo2'], groups: ['firebase']}]}">

```vue
<script>
/* ✗ BAD */
createComponent({
  computed: {
    foo () {}
  },
  firebase: {
    foo2 () {}
  }
})
</script>
```

</eslint-code-block>

## :books: 延伸阅读

- [保留关键词列表](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/utils/mpx-reserved.json)

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-reserved-keys.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-reserved-keys.js)