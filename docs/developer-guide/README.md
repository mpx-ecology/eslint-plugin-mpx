# 开发指南

欢迎贡献。

## :bug: 错误报告

如果您认为在 ESLint 中发现了错误，请[创建一个新问题](https://github.com/mpx-ecology/eslint-plugin-mpx/issues/new?labels=&template=bug_report.md)或 GitHub 上的拉取请求。

请提供尽可能多的详细信息，以帮助我们正确解决您的问题。 如果我们需要对问题进行分类并不断向人们询问更多细节，那就是实际解决问题的时间。 通过在您的问题中包含大量细节来帮助我们尽可能提高效率。

## :sparkles: 提出新规则或规则变更

为了添加新规则或规则更改，您应该：

- 在 GitHub 上创建带有提议规则描述的问题
- 使用 [official yeoman generator](https://github.com/eslint/generator-eslint) 生成新规则
- 运行`npm start`
- 编写测试场景和实现逻辑
- 在生成的 `docs` 文件中描述规则
- 确保所有测试都通过
- 运行 `npm run lint` 并修复所有错误
- 运行 `npm run update` 以更新自述文件和推荐配置
- 在描述中创建 PR 和链接创建的问题

我们很高兴看到潜在的贡献，所以不要犹豫。 如果您有任何建议、想法或问题，请随时添加新的 [issue](https://github.com/mpx-ecology/eslint-plugin-mpx/issues)，但首先请确保您的问题不重复之前的问题。

## :fire: 使用规则

在开始编写新规则之前，请阅读[官方 ESLint 指南](https://eslint.org/docs/developer-guide/working-with-rules)。

接下来，为了了解您要检查的代码的 AST 是什么样的，请使用 [astexplorer.net]。
[astexplorer.net] 是检查 AST 的绝佳工具，暂未支持Mpx,可选择Vue类似查看

打开[astexplorer.net]后，选择`Vue`作为语法，选择`vue-eslint-parser`作为解析器。

[astexplorer.net](https://astexplorer.net/)

由于 Vue 中的单个文件组件不是纯 JavaScript，我们不能使用默认解析器，我们不得不引入额外的一个：`vue-eslint-parser`，它生成增强的 AST，节点代表模板语法的特定部分，以及 `<script>` 标签内的内容。

要了解有关生成的 AST 中某些节点的更多信息，请访问此处：
- [ESTree 文档](https://github.com/estree/estree)
- [vue-eslint-parser AST 文档](https://github.com/mysticatea/vue-eslint-parser/blob/master/docs/ast.md)

`Mpx-eslint-parser` 提供了一些有用的解析器服务，以帮助遍历生成的 AST 和访问模板的令牌：
-`context.parserServices.defineTemplateBodyVisitor（访问者，scriptVisitor）`
-`context.parserServices.getTemplateBodyTokenStore()`

查看 [示例规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/mustache-interpolation-spacing.js) 以更好地了解这些规则是如何工作的。

请注意，关于您将在测试中编写什么样的代码示例，您必须在“RuleTester”中相应地设置解析器（不过，您可以根据每个测试用例进行设置）。 [在此处查看示例](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/attribute-hyphenation.js#L19)

如果您遇到困难，请记住您已经可以学习很多规则，如果您找不到正确的解决方案 - 请不要犹豫，解决问题。我们很乐意提供帮助！

## :white_check_mark: 使用 TypeScript 进行 JSDoc 类型检查

我们通过 TypeScript 和 JSDoc 启用了类型检查。
执行类型检查的命令是：`npm run tsc`

这只是为了帮助您编写规则，而不是进行严格的类型检查。 如果您发现难以解决类型检查警告，请随意使用 `// @ts-nocheck` 和 `// @ts-ignore` 注释来抑制警告。