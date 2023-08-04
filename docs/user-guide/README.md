# 用户指南

## :cd: 安装

Via [npm](https://www.npmjs.com/):
```bash
npm install --save-dev eslint eslint-plugin-mpx
```

Via [yarn](https://yarnpkg.com/):
```bash
yarn add -D eslint eslint-plugin-mpx
```

::: tip Requirements
- ESLint v6.2.0 and above
- Node.js v8.10.0 and above
:::

## :book: 使用

### 配置

使用`.eslintrc.*`文件来配置规则。另见：[https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring).

示例 **.eslintrc.js**:

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:mpx/mpx-essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'mpx/no-unused-vars': 'error'
  }
}
```

请参阅[规则列表](../rules/README.md)以获取“extends”的配置提供的规则。

:::warning 报告规则
默认情况下，来自 **base** 和 **essential** 类别的所有规则都会报告 ESLint 错误。其他规则——因为它们没有涵盖应用程序中的潜在错误——报告警告。 这是什么意思？ 默认情况下 - 什么都没有，但如果你愿意 - 你可以设置一个阈值并在一定数量的警告后中断构建，而不是任何警告。 [更多信息](https://eslint.org/docs/user-guide/command-line-interface#handling-warnings).
:::

### 集成配置
因为mpx的解析会影响到ts,js文件的eslint解析，需要overrides一下对应文件的解析器，所以集成了一个eslint的config文件,[具体配置](https://github.com/mpx-ecology/eslint-config)

```js
// .eslintrc.js
module.exports = {
  extends: ['@mpxjs']
}
```

### 命令行运行ESLint

如果要从命令行运行 `eslint`，请确保使用 [`--ext` 选项](https://eslint.org/docs/user-guide/configuring#specifying-file-extensions-to-lint)包含 `.mpx` 扩展名或 glob 模式，因为 ESLint 默认只针对 `.js` 文件。

示例:

```bash
eslint --ext .js,.mpx src
eslint "src/**/*.{js,mpx}"
```

### 如何使用自定义解析器？

如果您想使用自定义解析器，例如[babel-eslint](https://www.npmjs.com/package/babel-eslint)或[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)，您必须使用 parserOptions.parser 选项而不是 parser 选项。 因为这个插件需要[mpx-eslint-parser](https://github.com/mpx-ecology/mpx-eslint-parser)来解析 .mpx 文件，所以如果你覆盖 parser 选项，这个插件就不起作用。

```diff
- "parser": "babel-eslint",
+ "parser": "mpx-eslint-parser",
  "parserOptions": {
+     "parser": "babel-eslint",
      "sourceType": "module"
  }
```

### 通过`<!-- eslint-disable -->`禁用规则

您可以在`.mpx`文件的`<template>`块级别使用 `<!-- eslint-disable -->`类似 HTML 注释来临时禁用某个规则。

示例:

```vue
<template>
  <!-- eslint-disable-next-line mpx/valid-wx-if -->
  <view wx:if=""></view>
</template>
```

如果你想在 `<template>` 中禁用 `eslint-disable` 功能，请禁用 [mpx/comment-directive](../rules/comment-directive.md) 规则。

## :computer: 编辑器集成

### Visual Studio Code

使用 Microsoft 官方提供的 [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 扩展。

您必须配置扩展的 `eslint.validate` 选项来检查 `.mpx` 文件，因为默认情况下扩展只针对 `*.js`文件。

示例 **.vscode/settings.json**:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "mpx"
  ]
}
```

您必须使用[Mpx](https://marketplace.visualstudio.com/items?itemName=pagnkelly.mpx) 插件，请设置 `"Mpx.validation.template": false` 以避免默认的 Mpx 模板验证。 查看 [Mpx 文档](https://github.com/mpx-ecology/vscode-mpx) 了解更多信息。

### 其他ide支持暂未推出


## :question: FAQ

### 什么是“使用最新的mpx-eslint-parser”错误？

大多数 `eslint-plugin-mpx` 规则需要 `mpx-eslint-parser` 来检查 `<template>` AST。

确保您的 **.eslintrc** 中有以下设置之一：

- `"extends": ["plugin:mpx/mpx-essential"]`
- `"extends": ["plugin:mpx/base"]`

如果你已经使用了另一个解析器（例如 `"parser": "babel-eslint"`），请将它移到 `parserOptions` 中，这样它就不会与该插件配置使用的 `mpx-eslint-parser` 冲突：

```diff
- "parser": "babel-eslint",
+ "parser": "mpx-eslint-parser",
  "parserOptions": {
+     "parser": "babel-eslint",
      "ecmaVersion": 2020,
      "sourceType": "module"
  }
```
可以看看: "[如何使用自定义解析器？](#如何使用自定义解析器)" 模块.
