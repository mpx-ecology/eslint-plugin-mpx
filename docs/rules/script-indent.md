---
pageClass: rule-details
sidebarDepth: 0
title: mpx/script-indent
description: 执行一致的缩进 `<script>`
---
# mpx/script-indent

> 执行一致的缩进 `<script>`

## :book: 规则详情

此规则强制在`<script>`. 默认样式为 2 个空格。

<eslint-code-block fix :rules="{'mpx/script-indent': ['error']}">

```mpx
<script>
let a = {
  foo: 1,
  bar: 2
}
let b = {
      foo: 1,
      bar: 2
    },
    c = {
      foo: 1,
      bar: 2
    }
const d = {
        foo: 1,
        bar: 2
      },
      e = {
        foo: 1,
        bar: 2
      }
</script>
```

</eslint-code-block>

## :wrench: 选项

该规则有一些选项。

```json
{
  "mpx/script-indent": ["error", TYPE, {
    "baseIndent": 0,
    "switchCase": 0,
    "ignores": []
  }]
}
```

- `TYPE` (`number | "tab"`) ...  缩进的类型。默认为2。如果这是一个数字，它是一个缩进的空格数。如果是"tab"，它使用一个制表符进行一个缩进。
- `baseIndent` (`integer`) ... 优先级最高语句的缩进倍数。默认为`0`。
- `switchCase` (`integer`) ... `case`/`default`的缩进倍数。 默认为`0`。
- `ignores` (`string[]`) ... 忽略的节点列表。AST 规范在[这里](https://github.com/mpxjs/mpx-eslint-parser/blob/master/docs/ast.md). 您可以使用[esquery](https://github.com/estools/esquery#readme)来选择节点。默认为空数组。

::: warning Note
该规则只检查 `.mpx` 文件，不干扰其他 `.js` 文件. 不幸的是，默认 `indent` 规则在打开时会尝试对两者进行 lint，因此为了使它们互补，您可以对文件使用 `overrides` 设置和禁用 `indent` 规则 :
:::

```json
{
  "rules": {
    "mpx/script-indent": ["error", 2, { "baseIndent": 1 }]
  },
  "overrides": [
    {
      "files": ["*.mpx"],
      "rules": {
        "indent": "off"
      }
    }
  ]
}
```

### `2, "baseIndent": 1`

<eslint-code-block fix :rules="{'mpx/script-indent': ['error', 2, { 'baseIndent': 1 }]}">

```mpx
<script>
  let a = {
    foo: 1,
    bar: 2
  }
  let b = {
        foo: 1,
        bar: 2
      },
      c = {
        foo: 1,
        bar: 2
      }
  const d = {
          foo: 1,
          bar: 2
        },
        e = {
          foo: 1,
          bar: 2
        }
</script>
```

</eslint-code-block>

## :mag: 具体实现

- [Rule](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/script-indent.js)
- [Test](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/script-indent.js)
