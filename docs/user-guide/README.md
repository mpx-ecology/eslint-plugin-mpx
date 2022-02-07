# 用户指南

## :cd: 安装

Via [npm](https://www.npmjs.com/):
```bash
npm install --save-dev eslint eslint-plugin-mpx@next
```

Via [yarn](https://yarnpkg.com/):
```bash
yarn add -D eslint eslint-plugin-mpx@next
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

如果您使用 `Mpx` 插件，请设置 `"Mpx.validation.template": false` 以避免默认的 Mpx 模板验证。 查看 [Mpx 文档](https://github.com/mpx-ecology/vscode-mpx) 了解更多信息。

### Sublime Text

Use Package Control to install **SublimeLinter** and its ESLint extension **[SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint)**.

In the menu go to `Preferences > Package Settings > SublimeLinter > Settings` and paste in this:

```json
{
  "linters": {
    "eslint": {
      "selector": "text.html.vue, source.js - meta.attribute-with-value"
    }
  }
}
```

### Atom editor

Go into `Settings -> Packages -> linter-eslint`, under the option "List of scopes to run eslint on", add `text.html.vue`. You may need to restart Atom.

### IntelliJ IDEA / JetBrains WebStorm

In the **Settings/Preferences** dialog (`Cmd+,`/`Ctrl+Alt+S`), choose JavaScript under **Languages and Frameworks** and then choose **ESLint** under **Code Quality Tools**.
On the **ESLint page** that opens, select the *Enable* checkbox.

If your ESLint configuration is updated (manually or from your version control), open it in the editor and choose **Apply ESLint Code Style Rules** in the context menu.

read more: [JetBrains - ESLint](https://www.jetbrains.com/help/idea/eslint.html)

## :question: FAQ

### What is the "Use the latest vue-eslint-parser" error?

Most `eslint-plugin-vue` rules require `vue-eslint-parser` to check `<template>` ASTs.

Make sure you have one of the following settings in your **.eslintrc**:

- `"extends": ["plugin:vue/vue3-recommended"]`
- `"extends": ["plugin:vue/base"]`

If you already use another parser (e.g. `"parser": "babel-eslint"`), please move it into `parserOptions`, so it doesn't collide with the `vue-eslint-parser` used by this plugin's configuration:

```diff
- "parser": "babel-eslint",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+     "parser": "babel-eslint",
      "ecmaVersion": 2020,
      "sourceType": "module"
  }
```

See also: "[How to use a custom parser?](#how-to-use-a-custom-parser)" section.

### Why doesn't it work on .vue files?

1. Make sure you don't have `eslint-plugin-html` in your config. The `eslint-plugin-html` extracts the content from `<script>` tags, but `eslint-plugin-vue` requires `<script>` tags and `<template>` tags in order to distinguish template and script in single file components.

  ```diff
    "plugins": [
      "vue",
  -   "html"
    ]
  ```

2. Make sure your tool is set to lint `.vue` files.
  - CLI targets only `.js` files by default. You have to specify additional extensions with the `--ext` option or glob patterns. E.g. `eslint "src/**/*.{js,vue}"` or `eslint src --ext .vue`. If you use `@vue/cli-plugin-eslint` and the `vue-cli-service lint` command - you don't have to worry about it.
  - If you are having issues with configuring editor, please read [editor integrations](#editor-integrations)

### Conflict with [Prettier].

If the [Prettier] conflicts with the shareable config provided by this plugin, use [eslint-config-prettier] to resolve it.

Example **.eslintrc.js**:

```js
module.exports = {
  // ...
  extends: [
    // ...
    // 'eslint:recommended',
    // ...
    'plugin:vue/vue3-recommended',
    // ...
    "prettier",
    "prettier/vue",
    // "prettier/@typescript-eslint", // required if you are using @typescript-eslint.
    // Other settings may be required depending on the plugin you are using. See the eslint-config-prettier documentation for more details.
  ],
  // ...
}
```

If the [Prettier] conflicts with the rule you have set, turn off that rule.

Example **.eslintrc.js**:

When the `vue/html-indent` rule conflict with [Prettier].

```diff
module.exports = {
  // ...
  rules: {
    // ...
-    "vue/html-indent": "error",
+    "vue/html-indent": "off",
    // ...
  },
  // ...
}
```

[prettier]: https://prettier.io/
[eslint-config-prettier]: https://github.com/prettier/eslint-config-prettier

### Using JSX.

If you are using JSX, you need to enable JSX in your ESLint configuration.

```diff
  "parserOptions": {
      "ecmaVersion": 2020,
      "ecmaFeatures": {
+         "jsx": true
      }
  }
```

See also [ESLint - Specifying Parser Options](https://eslint.org/docs/user-guide/configuring#specifying-parser-options).

The same configuration is required when using JSX with TypeScript (TSX) in the `.vue` file.  
See also [here](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#parseroptionsecmafeaturesjsx).  
Note that you cannot use angle-bracket type assertion style (`var x = <foo>bar;`) when using `jsx: true`.

### Trouble with Visual Studio Code

- Turning off the rule in the ESLint configuration file does not ignore the warning.
- Using the `<!-- eslint-disable -->` comment does not suppress warnings.
- Duplicate warnings are displayed.
- Used `babel-eslint`, but the template still show `vue/no-parsing-error` warnings.

You need to turn off Vetur's template validation by adding `vetur.validation.template: false` to your `.vscode/settings.json`.

See also: "[Visual Studio Code](#editor-integrations)" section and [Vetur - Linting](https://vuejs.github.io/vetur/linting-error.html#linting).
