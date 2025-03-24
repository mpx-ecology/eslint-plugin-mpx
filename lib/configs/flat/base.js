/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
module.exports = [
  {
    name: 'mpx/base',
    plugins: {
      get mpx() {
        return require('../../index')
      }
    },
    languageOptions: {
      parser: require('mpx-eslint-parser'),
      sourceType: 'module'
    },
    rules: {
      'vue/comment-directive': 'error'
    }
  }
]
