/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
'use strict'

const rules = require('../../tools/lib/rules')
const path = require('path')

const uncategorizedRules = rules.filter(
  (rule) =>
    !rule.meta.docs.categories &&
    !rule.meta.docs.extensionRule &&
    !rule.meta.deprecated
)
const uncategorizedExtensionRule = rules.filter(
  (rule) =>
    !rule.meta.docs.categories &&
    rule.meta.docs.extensionRule &&
    !rule.meta.deprecated
)
const deprecatedRules = rules.filter((rule) => rule.meta.deprecated)

const sidebarCategories = [
  { title: 'base', categoryIds: ['base'] },
  {
    title: 'Essential',
    categoryIds: ['mpx-essential']
  },
  {
    title: 'Composition-api-essential',
    categoryIds: ['composition-api-essential']
  }
]

const categorizedRules = []
for (const { title, categoryIds } of sidebarCategories) {
  const categoryRules = rules
    .filter((rule) => rule.meta.docs.categories && !rule.meta.deprecated)
    .filter((rule) =>
      categoryIds.every((categoryId) =>
        rule.meta.docs.categories.includes(categoryId)
      )
    )
  const children = categoryRules
    .filter(({ ruleId }) => {
      const exists = categorizedRules.some(({ children }) =>
        children.some(([, alreadyRuleId]) => alreadyRuleId === ruleId)
      )
      return !exists
    })
    .map(({ ruleId, name }) => [`/rules/${name}`, ruleId])

  if (children.length === 0) {
    continue
  }
  categorizedRules.push({
    title,
    collapsable: false,
    children
  })
}

const extraCategories = []
if (uncategorizedRules.length > 0) {
  extraCategories.push({
    title: 'Uncategorized',
    collapsable: false,
    children: uncategorizedRules.map(({ ruleId, name }) => [
      `/rules/${name}`,
      ruleId
    ])
  })
}
if (uncategorizedExtensionRule.length > 0) {
  extraCategories.push({
    title: 'Extension Rules',
    collapsable: false,
    children: uncategorizedExtensionRule.map(({ ruleId, name }) => [
      `/rules/${name}`,
      ruleId
    ])
  })
}
if (deprecatedRules.length > 0) {
  extraCategories.push({
    title: 'Deprecated',
    collapsable: false,
    children: deprecatedRules.map(({ ruleId, name }) => [
      `/rules/${name}`,
      ruleId
    ])
  })
}

module.exports = {
  configureWebpack(_config, _isServer) {
    return {
      resolve: {
        alias: {
          module: require.resolve('./shim/module'),
          eslint$: require.resolve('./shim/eslint'),
          'eslint/use-at-your-own-risk': path.join(
            __dirname,
            './shim/use-at-your-own-risk.mjs'
          ),
          esquery: path.resolve(
            __dirname,
            '../../node_modules/esquery/dist/esquery.min.js'
          ),
          '@eslint/eslintrc/universal': path.resolve(
            __dirname,
            '../../node_modules/@eslint/eslintrc/dist/eslintrc-universal.cjs'
          )
        }
      },
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          }
        ]
      }
    }
  },

  base: '/eslint-plugin-mpx/',
  title: 'eslint-plugin-mpx',
  description: 'Mpx的官方ESLint插件',
  evergreen: true,
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    }
  },

  themeConfig: {
    repo: 'mpx-ecology/eslint-plugin-mpx',
    docsRepo: 'mpx-ecology/eslint-plugin-mpx',
    docsDir: 'docs',
    docsBranch: 'master',
    nav: [
      { text: '用户指南', link: '/user-guide/' },
      { text: '开发指南', link: '/developer-guide/' },
      { text: '规则', link: '/rules/' }
    ],

    sidebar: {
      '/rules/': [
        '/rules/',
        // Rules in each category.
        ...categorizedRules,

        // Rules in no category.
        ...extraCategories
      ],

      '/': ['/', '/user-guide/', '/developer-guide/', '/rules/']
    },
    // search: true,
    // searchMaxSuggestions: 10,
    algolia: {
      appId: '9KHDAQQGBT',
      apiKey: 'bace1bce5afa386613e690d8d44a6525',
      indexName: 'eslint-plugin-mpx'
    }
  }
}
