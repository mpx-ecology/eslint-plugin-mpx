---
pageClass: rule-details
sidebarDepth: 0
title: mpx/component-tags-order
description: enforce order of component top-level elements
---
# mpx/component-tags-order
> enforce order of component top-level elements

- :gear: This rule is included in `"plugin:mpx/mpx3-recommended"` and `"plugin:mpx/recommended"`.

## :book: Rule Details

This rule warns about the order of the `<script>`, `<template>` & `<style>` tags.

## :wrench: Options

```json
{
  "mpx/component-tags-order": ["error", {
    "order": [ [ "script", "template" ], "style" ]
  }]
}
```

- `order` (`(string|string[])[]`) ... The order of top-level element names. default `[ [ "script", "template" ], "style" ]`.

### `{ "order": [ [ "script", "template" ], "style" ] }` (default)

<eslint-code-block :rules="{'mpx/component-tags-order': ['error']}">

```vue
<!-- ✓ GOOD -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

</eslint-code-block>

<eslint-code-block :rules="{'mpx/component-tags-order': ['error']}">

```vue
<!-- ✓ GOOD -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</eslint-code-block>

<eslint-code-block :rules="{'mpx/component-tags-order': ['error']}">

```vue
<!-- ✗ BAD -->
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

</eslint-code-block>

### `{ "order": ["template", "script", "style"] }`

<eslint-code-block :rules="{'mpx/component-tags-order': ['error', { 'order': ['template', 'script', 'style'] }]}">

```vue
<!-- ✓ GOOD -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</eslint-code-block>

<eslint-code-block :rules="{'mpx/component-tags-order': ['error', { 'order': ['template', 'script', 'style'] }]}">

```vue
<!-- ✗ BAD -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

</eslint-code-block>

### `{ "order": ["docs", "template", "script", "style"] }`

<eslint-code-block :rules="{'mpx/component-tags-order': ['error', { 'order': ['docs', 'template', 'script', 'style'] }]}">

```vue
<!-- ✓ GOOD -->
<docs> documents </docs>
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</eslint-code-block>

<eslint-code-block :rules="{'mpx/component-tags-order': ['error', { 'order': ['docs', 'template', 'script', 'style'] }]}">

```vue
<!-- ✗ BAD -->
<template>...</template>
<script>/* ... */</script>
<docs> documents </docs>
<style>/* ... */</style>
```

</eslint-code-block>

## :books: Further Reading

- [Style guide - Single-file component top-level element order](https://v3.vuejs.org/style-guide/#single-file-component-top-level-element-order-recommended)

## :mag: Implementation

- [Rule source](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/component-tags-order.js)
- [Test source](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/component-tags-order.js)
