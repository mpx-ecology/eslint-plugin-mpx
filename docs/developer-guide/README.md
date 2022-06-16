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

## :fire: 编写规则

在开始编写新规则之前，请阅读[官方 ESLint 指南](https://eslint.org/docs/developer-guide/working-with-rules)。

接下来，为了了解您要检查的代码的 AST 是什么样的，请使用 [astexplorer.net]。
[astexplorer.net] 是检查 AST 的绝佳工具，暂未支持Mpx，仅可查看js相关

[astexplorer.net](https://astexplorer.net/)

由于 Mpx 中的单个文件组件不是纯 JavaScript，我们不能使用默认解析器，我们不得不引入额外的一个：`mpx-eslint-parser`，它生成增强的 AST，节点代表模板语法的特定部分，以及 `<script>` 标签内的内容。

要了解有关生成的 AST 中某些节点的更多信息，请访问此处：
- [ESTree 文档](https://github.com/estree/estree)
- [mpx-eslint-parser AST 文档](https://github.com/mpx-ecology/mpx-eslint-parser/blob/master/docs/ast.md)

`Mpx-eslint-parser` 提供了一些有用的解析器服务，以帮助遍历生成的 AST 和访问模板的令牌：
-`context.parserServices.defineTemplateBodyVisitor（访问者，scriptVisitor）`
-`context.parserServices.getTemplateBodyTokenStore()`

查看 [示例规则](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/lib/rules/valid-wx-if.js) 以更好地了解这些规则是如何工作的。

请注意，关于您将在测试中编写什么样的代码示例，您必须在“RuleTester”中相应地设置解析器（不过，您可以根据每个测试用例进行设置）。 [在此处查看示例](https://github.com/mpx-ecology/eslint-plugin-mpx/blob/master/tests/lib/rules/valid-wx-if.js)

最佳的编写规则实践是基于TDD(Test Drived Develop)的开发模式 

1. 在tests/lib下写下你的测试文件
```js
const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/test')
const tester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('test', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: '<template><view class="a"><input class="b"></input><view class="c"></view><view class="d"></view></view></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.mpx',
      code: '<script>function a (){ this.b = 1 }</script>',
      errors: ['wrong']
    }
  ]
})

```
2. 在lib/rules下写规则的详细，并且在lib/index下导出
```js
const utils = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'test file',
      categories: [''],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/test.html'
    },
    fixable: null,
    schema: []
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      /** @param {VDirective} node */
      "VElement[name='input'] ~ VElement"(node) {
      }
    }, {
      'MemberExpression > ThisExpression'(node) {}
    })
  }
}

```

3. 通过npm run test进行调试

如果您遇到困难，请记住您已经可以学习很多规则，如果您找不到正确的解决方案 - 请不要犹豫，提出issue解决问题。我们很乐意提供帮助！


## :mag: 灵活匹配节点

我们在编写规则的时候，想要匹配某个节点下的子节点或者兄弟节点，可以通过[esquery](https://github.com/estools/esquery)提供的方式来编写我们的visitor

```js
/* 
<template>
  <view class="a">
    <input class="b"></input>
    <view class="c"></view>
    <view class="d"></view>
  </view>
</template>
*/

create(context) {
  return utils.defineTemplateBodyVisitor(context, {
    // 匹配属性为class的节点
    "VAttribute[key.name='class']"(node) {},
    // 匹配属性为class值为a的节点
    "VAttribute[key.name='class'][value.value='a']"(node) {},
    // 匹配tempalte节点下属性有class的所有节点
    "VElement[name='template'] VAttribute[key.name='class'"(node) {},
    // 匹配tempalte节点的children节点为VElement类型的 (即为class=a的节点)
    "VElement[name='template'] > VElement"(node) {},
    // 匹配input节点所有兄弟节点 (即为class=c的节点和class=d的节点)
    "VElement[name='input'] ~ VElement"(node) {},
    // 匹配input节点下一个兄弟节点 (即为class=c的节点)
    "VElement[name='input'] + VElement"(node) {}
  },
  {
    // js模块同理，这里不过多展示
    // 匹配function中表达式的this表达式
    'MemberExpression > ThisExpression'(node) {}
  }
  )
}
```

## :zap: 内置工具函数

* [defineTemplateBodyVisitor](#defineTemplateBodyVisitor) (定义模版Visitor)
* [wrapCoreRule](#wrapCoreRule) (Eslint规则适配Template)
* [isDef](#isDef) (检查给定值是否已定义)
* [prevSibling](#prevSibling) (获取给定元素的前一个兄弟元素)
* [hasAttribute](#hasAttribute) (检查给定的开始标签是否有特定的属性)
* [hasDirective](#hasDirective) (检查给定的开始标签是否有特定的指令)
* [isEmptyValueDirective](#isEmptyValueDirective) (检查给定的指令属性是否具有空值(`=""`))
* [isEmptyExpressionValueDirective](#isEmptyExpressionValueDirective) ()
* [getAttribute](#getAttribute) ()
<a id="defineTemplateBodyVisitor"></a>
<br />

### defineTemplateBodyVisitor
> 定义模版Visitor,匹配template和js的节点进行规则处理
```js
/* @param context 解析器的上下文
 * @param templateBodyVisitor 遍历模板的visitor.
 * @param [scriptVisitor] 遍历script的visitor.
 * @returns {RuleListener} 合并的visitor.
 */
function defineTemplateBodyVisitor(
  context: RuleContext,
  templateBodyVisitor: TemplateListener,
  scriptVisitor?: RuleListener
): RuleListener

// example
create(context) {
  return defineTemplateBodyVisitor(context, {
    'VElement'(node) {}
  }, {
    'Program'(node) {}
  }) 
}
```
<a id="wrapCoreRule"></a>
<br />

### wrapCoreRule
> Eslint规则适配Template,可以让eslint规则检测tempalte中的表达式
```js
/**
   * @callback WrapCoreRuleCreate
   * @param {RuleContext} ruleContext
   * @param {WrapCoreRuleCreateContext} wrapContext
   * @returns {TemplateListener}
   *
   * @typedef {object} WrapCoreRuleCreateContext
   * @property {RuleListener} coreHandlers
   */
  /**
   * @callback WrapCoreRulePreprocess
   * @param {RuleContext} ruleContext
   * @param {WrapCoreRulePreprocessContext} wrapContext
   * @returns {void}
   *
   * @typedef {object} WrapCoreRulePreprocessContext
   * @property { (override: Partial<RuleContext>) => RuleContext } wrapContextToOverrideProperties 重写规则的context
   * @property { (visitor: TemplateListener) => void } defineVisitor 定义template的Visitor
   */
  /**
   * 让eslint core里的规则适用于mpx文件
   * @param {string} coreRuleName core里的规则名字
   * @param {Object} [options] 规则配置项
   * @param {string[]} [options.categories] 规则的类别
   * @param {boolean} [options.skipDynamicArguments] 如果为true，则跳过动态参数
   * @param {boolean} [options.skipDynamicArgumentsReport] 如果“true”，则跳过动态参数中的报告。
   * @param {WrapCoreRulePreprocess} [options.preprocess] 调用核心规则创建的预处理。
   * @param {WrapCoreRuleCreate} [options.create] 如果定义，则扩展核心规则。
   * @returns {RuleModule} 包装的规则实现。
   */

function wrapCoreRule(coreRuleName: string, options: Object): RuleModule

// example
// eslint-disable-next-line
module.exports = wrapCoreRule('eqeqeq', {
  applyDocument: true
})
```
<a id="isDef"></a>
<br />

### isDef
> 检查给定值是否已定义。
```js
/**
 * @template T
 * @param {T | null | undefined} v
 * @returns {v is T}
 */
function isDef<T>(v:T | null | undefined): T

// example
isDef({ node })

```
<a id="prevSibling"></a>
<br />

### prevSibling
> 获取给定元素的前一个兄弟元素。
```js
/**
 * @param {VElement} node 获取上一个兄弟元素的元素节点。
 * @returns {VElement|null} 上一个兄弟元素。
 */
function prevSibling(node: VElement): VElement|null

// example
prevSibling(node)
```

<a id="hasAttribute"></a>
<br />

### hasAttribute
> 检查给定的开始标签是否有特定的属性。
```js
/**
 * @param {VElement} node 要检查的开始标记节点。
 * @param {string} name 要检查的属性名称。
 * @param {string} [value] 要检查的属性值。
 * @returns {boolean} `true`代表开始标签具有属性。
 */
function hasAttribute(node:VElement, name:string, value?:string): boolean 

// example
// <view class="item"></view>
hasAttribute(node, 'class', 'item') => true
```

<a id="hasDirective"></a>
<br />

### hasDirective
> 检查给定的开始标签是否有特定的指令。
```js
/**
 * @param {VElement} node 要检查的开始标记节点。
 * @param {string} name 要检查的指令名称。
 * @param {string} [argument] 要检查的指令参数。
 * @returns {boolean} `true`代表开始标签具有指令。
 */
function hasDirective(node:VElement, name:string, argument?:string): boolean

// example
// <view wx:if="a"></view>
hasDirective(node, 'if') => true
```
<a id="isEmptyValueDirective"></a>
<br />

### isEmptyValueDirective
> 检查给定的指令属性是否具有空值（`=""、="{{}}"`）。
```js
/**
 * @param {VDirective} node 要检查的指令属性节点。
 * @param {RuleContext} context 使用解析器服务的规则上下文。
 * @returns {boolean} `true` 代表指令属性的值为空（`=""`）。
 */
function isEmptyValueDirective(node:VDirective, context:RuleContext): boolean

// example
isEmptyValueDirective(node, context)
// wx:if="" => true
// wx:if="{{}}" => true
// wx:if="{{a}}" => false
```
<a id="isEmptyExpressionValueDirective"></a>
<br />

### isEmptyExpressionValueDirective
> 检查给定的指令属性是否有它们的空表达式值（例如`=""`）。
```js
/**
 * @param {VDirective} node 要检查的指令属性节点。
 * @param {RuleContext} context T使用解析器服务的规则上下文。
 * @returns {boolean} `true` 如果指令属性的表达式值为空。
 */
function isEmptyExpressionValueDirective(node:VDirective, context:RuleContext): boolean

// example
isEmptyExpressionValueDirective(node, context)
// wx:if="" => true
// 方法待改进
```
<a id="getAttribute"></a>
<br />

### getAttribute
> 获取具有给定名称的属性。
```js
/**
 * @param {VElement} node 要检查的开始标记节点。
 * @param {string} name 要检查的属性名称。
 * @param {string} [value] 要检查的属性值。
 * @returns {VAttribute | null} 找到的属性。
 */
function getAttribute(node:VElement, name:string, value:string):VAttribute|null {

// example
getAttribute(node, 'class', 'item') => VAttribute
```
<a id="getDirective"></a>
<br />

### getDirective
> 获取具有给定名称的属性。
```js
/**
 * @param {VElement} node 要检查的开始标记节点。
 * @param {string} name 要检查的属性名称。
 * @param {string} [value] 要检查的属性值。
 * @returns {VAttribute | null} 找到的属性。
 */
function getDirective(node:VElement, name:string, value?:string):VAttribute|null {

// example
getDirective(node, 'if', 'a') => VAttribute
```
<a id="getDirectives"></a>
<br />

### getDirectives
> 获取具有给定名称的指令列表。
```js
/**
 * @param {VElement | VStartTag} node 要检查的开始标记节点。
 * @param {string} name 要检查的指令名称。
 * @returns {VDirective[]} 指令的数组。
 */
function getDirectives(node:VElement| VStartTag, name:string):VDirective[] {

// example
getDirectives(node, 'if')
```
<a id="prevElementHasIf"></a>
<br />

### prevElementHasIf
> 检查前一个兄弟元素是否有 `if` 或 `elif` 指令。
```js
 /**
   * @param {VElement} node 要检查的元素节点。
   * @returns {boolean} 如果前一个兄弟元素有 `if` 或 `elif` 指令，则为 `true`。
   */
function prevElementHasIf(node:VElement): boolean

// example
prevElementHasIf(node)
// <view></view> => false
// <view wx:if="{{a}}"></view> => false
// <view wx:elif="{{b}}"></view> => true
```
<a id="isCustomComponent"></a>
<br />

### isCustomComponent
> 检查给定节点是否是自定义组件。
```js
/**
 * @param {VElement} node 要检查的开始标记节点。
 * @returns {boolean} `true` 如果节点是自定义组件。
 */
function isCustomComponent(node: VElement): boolean

// example
isCustomComponent(node)
// <component is="a" /> => true
```
<a id="isMpElementName"></a>
<br />

### isMpElementName
> 检查给定名称是否是小程序元素。
```js
/**
  * @param {string} name 要检查的名称。
  * @returns {boolean} `true` 如果名称是小程序元素名称。
  */
function isMpElementName(name:string)

// example
isMpElementName('view') => true
```
<a id="getStaticPropertyName"></a>
<br />

### getStaticPropertyName
> 获取给定节点的属性名称。
```js
/**
 * @param {Property|AssignmentProperty|MethodDefinition|MemberExpression} node - 要获取的节点。
 * @return {string|null} 属性名称（如果是静态的）。 否则为空。
 */
function getStaticPropertyName(node: Property|AssignmentProperty|MethodDefinition|MemberExpression): string|null

// example
<script>
  createComponent({
    computed: { // getStaticPropertyName(node) => computed
      foo: function () {} // getStaticPropertyName(node) => foo
    }
  })
</script>
```
<a id="getStringLiteralValue"></a>
<br />

### getStringLiteralValue
> 获取给定节点的字符串。
```js
 /**
   * @param {Literal|TemplateLiteral} node - 要获取的节点。
   * @return {string|null} 如果是静态的，则为字符串。 否则为空。
   */
function getStringLiteralValue(node: Literal|TemplateLiteral): string|null

// example
<script>
  function a() {
    return true // getStringLiteralValue(node) true
        ? 1 // getStringLiteralValue(node) 1
        : 2 // getStringLiteralValue(node) 2
  }
</script>
```
<a id="getComponentPropsFromOptions"></a>
<br />

### getComponentPropsFromOptions
> 通过查看所有组件的属性来获取所有道具
```js
/**
 * @param {ObjectExpression} componentObject 具有组件定义的对象
 * @return {(ComponentArrayProp | ComponentObjectProp | ComponentUnknownProp)[]} 组件道具数组
 */
function getComponentPropsFromOptions(componentObject: ObjectExpression): (ComponentArrayProp | ComponentObjectProp | ComponentUnknownProp)[]

// example
createComponent({
  properties: {
    a: String // getComponentPropsFromOptions(node) => [propertiesNode...]
  }
})
```
<a id="getComputedProperties"></a>
<br />

### getComputedProperties
> 通过查看所有组件的属性来获取所有计算属性
```js
/**
 * @param {ObjectExpression} componentObject 具有组件定义的对象
 * @return {ComponentComputedProperty[]} 计算属性数组，格式为：[{key: String, value: ASTNode}]
 */
function getComputedProperties(componentObject:ObjectExpression): ComponentComputedProperty[]

// example
createComponent({
  computed: {
    foo() {} // getComponentPropsFromOptions(node) => [fooNode]
  }
})
```
<a id="isMpxFile"></a>
<br />

### isMpxFile
> 检测文件是不是.mpx后缀的文件
```js
/**
 * @param {string} path 文件路径
 * @return {boolean} 如果是mpx文件则为true否则为fasle
 */
function isMpxFile(path:string): boolean

// example
isMpxFile('/src/index.mpx') => true
```
<a id="compositingVisitors"></a>
<br />

### compositingVisitors
> 合并Visitors
```js
/**
 * @template T
 * @param {T} visitor
 * @param {...(TemplateListener | RuleListener | NodeListener)} visitors
 * @returns {T}
 */
function compositingVisitors(visitor:T,...visitors:): T

// example
compositingVisitors({
  'VElement'(node) { /* doSomething */ }
},{
  'VElement'(node) { /* doSomething */ }
}) => true
```
## :white_check_mark: 使用 TypeScript 进行 JSDoc 类型检查

我们通过 TypeScript 和 JSDoc 启用了类型检查。
执行类型检查的命令是：`npm run tsc`

这只是为了帮助您编写规则，而不是进行严格的类型检查。 如果您发现难以解决类型检查警告，请随意使用 `// @ts-nocheck` 和 `// @ts-ignore` 注释来抑制警告。
