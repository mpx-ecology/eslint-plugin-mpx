'use strict'
const config = require('./base.js')

module.exports = [
  {
    ...config[0],
    name: 'mpx/mpx-essential/rules',
    rules: {
      'mpx/comment-directive': 'error',
      'mpx/html-end-tags': 'error',
      'mpx/no-arrow-functions-in-watch': 'error',
      'mpx/no-async-in-computed-properties': 'error',
      'mpx/no-dupe-keys': 'error',
      'mpx/no-dupe-wx-elif': 'error',
      'mpx/no-duplicate-attributes': 'error',
      'mpx/no-reserved-keys': 'error',
      'mpx/no-side-effects-in-computed-properties': 'error',
      'mpx/return-in-computed-property': 'error',
      'mpx/valid-wx-if': 'error',
      'mpx/valid-wx-else': 'error',
      'mpx/valid-wx-elif': 'error',
      'mpx/valid-wx-model': 'error',
      'mpx/valid-swiper-item-style': 'error',
      'mpx/valid-wx-key': 'error',
      'mpx/valid-attribute-value': 'error',
      'mpx/valid-template-quote': 'error',
      'mpx/valid-component-range': 'error',
      'mpx/valid-properties': 'error'
    }
  }
]
