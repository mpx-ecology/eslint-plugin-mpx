---
pageClass: rule-details
sidebarDepth: 0
title: mpx/valid-properties
description: 校验properties有效值
---
# mpx/valid-properties
> 校验properties有效值

- :gear: 这条规则包含在`"plugin:mpx/mpx-essential"`。

此规则检查每个properties的值是否有效, 推荐开启ts获取更完善的类型校验。

## :book: 规则详情

保障properties的配置项有效，要求properties的配置项是只能是类型或对象。支持对`<script setup>`中的 defineProps 校验。

当配置项为对象时，只允许存在配置的键`（默认"type"、"value"、"optionalTypes"、"observer"）`，强制要求配置`"type"`。不允许配置空对象，因为在微信低版本基础库会报错导致白屏；不允许其他无效键存在，例如"default"会在skyline下引起报错。

<eslint-code-block :rules="{'mpx/valid-properties': ['error']}">

```vue
<script>
  // ✓ GOOD 
  createComponent({
    properties: {
      propsA: {
        type: String,
        value: ""
      },
      propsB: Object,
      propsC: {
        type: String,
        optionalTypes:[Number]
      }
    }
  })

  // ✗ BAD
  createComponent({
    properties: {
      propsA: {},
      propsB: '',
      propsC: {
        type: Object,
        default: {}
      },
      propsD: [1,2],
      propsE: {
        value: {}
      }
    }
  })
</script>
```
</eslint-code-block>

<eslint-code-block :rules="{'mpx/valid-properties': ['error']}">
```vue
<script setup>
  // ✓ GOOD
  const props = defineProps({
    propsA: {
      type: Object,
      value: {}
    },
    propsB: Array
  })

  // ✗ BAD
  const badProps = defineProps({
    propsA: {
      type: Object,
      default: {}
    },
    propsB: {}
  })
</script>
```
</eslint-code-block>

## :wrench: 选项
可配置allowKeys选项,允许properties的配置对象存在这些key。默认为`"type", "value", "optionalTypes", "observer"`
```json
{
  "mpx/valid-wx-key": ["error", {
    "allowKeys": ["type", "value","optionalTypes","observer"]
  }]
}
```

## :mag: 具体实现

- [规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-properties.js)
- [测试](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-properties.js)
