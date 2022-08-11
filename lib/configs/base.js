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
    my: 'readonly',
    getApp: 'readonly',
    __mpx_mode__: 'readonly',
    __mpx_env__: 'readonly'
  },
  plugins: ['mpx'],
  rules: {
    'mpx/comment-directive': 'error'
  }
}
