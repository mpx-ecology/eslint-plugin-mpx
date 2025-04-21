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
    files: ['*.mpx', '**/*.mpx'],
    languageOptions: {
      parser: require('mpx-eslint-parser'),
      sourceType: 'module',
      globals: {
        wx: 'readonly',
        my: 'readonly',
        swan: 'readonly',
        qq: 'readonly',
        tt: 'readonly',
        jd: 'readonly',
        qa: 'readonly',
        dd: 'readonly',
        getCurrentPages: 'readonly',
        getRegExp: 'readonly',
        getApp: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        Behavior: 'readonly',
        requirePlugin: 'readonly',
        requireMiniProgram: 'readonly',
        __mpx_mode__: 'readonly',
        __mpx_env__: 'readonly'
      }
    },
    processor: 'mpx/mpx'
  }
]
