# eslint-plugin-mpx

mpx的eslint插件

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-mpx`:

```
$ npm install eslint-plugin-mpx --save-dev
```

## Docs

https://mpx-ecology.github.io/eslint-plugin-mpx/

## Usage

Add `mpx` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```js
const eslintPluginMpx = require('eslint-plugin-mpx')
module.exports = [
    ...eslintPluginMpx.configs['flat/composition-api-essential']
]
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mpx/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





