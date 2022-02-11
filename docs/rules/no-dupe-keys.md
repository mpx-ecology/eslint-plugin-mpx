---
pageClass: rule-details
sidebarDepth: 0
title: mpx/no-dupe-keys
description: 不允许重复字段名
---
# mpx/no-dupe-keys
> 不允许重复字段名

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

## :book: 规则详情

此规则禁止使用重复的名称。

<eslint-code-block :rules="{'mpx/no-dupe-keys': ['error']}">

```vue
<script>
/* ✗ BAD */
createComponent({
  properties: {
    foo: String
  },
  computed: {
    foo: {
      get () {}
    }
  },
  data: {
    foo: null
  },
  methods: {
    foo () {}
  }
})
</script>
```

</eslint-code-block>

## :wrench: 选项

```json
{
  "mpx/no-dupe-keys": ["error", {
    "groups": []
  }]
}
```

- `"groups"` (`string[]`) 用于搜索重复项的其他组的数组。默认值为空。

### `"groups": ["firebase"]`

<eslint-code-block :rules="{'mpx/no-dupe-keys': ['error', {groups: ['firebase']}]}">

```vue
<script>
/* ✗ BAD */
createComponent({
  computed: {
    foo () {}
  },
  firebase: {
    foo () {}
  }
})
</script>
```

</eslint-code-block>

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/no-dupe-keys.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/no-dupe-keys.js)
