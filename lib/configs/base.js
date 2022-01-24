/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {
    wx: 'readonly',
    getApp: 'readonly',
    App: 'readonly',
    __mpx_mode__: 'readonly',
    __mpx_env__: 'readonly',
    requirePlugin: 'readonly'
  },
  plugins: ['mpx'],
  rules: {
    'mpx/comment-directive': 'error',
    'mpx/jsx-uses-vars': 'error',
    camelcase: ['error', { allow: ['__mpx_mode__', '__mpx_env__'] }]
  }
}
