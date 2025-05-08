'use strict'
const config = require('./base.js')

module.exports = [
  {
    ...config[0],
    name: 'mpx/composition-api-essential/rules',
    rules: {
      'mpx/comment-directive': 'error',
      'mpx/html-end-tags': 'error',
      'mpx/no-dupe-wx-elif': 'error',
      'mpx/no-duplicate-attributes': 'error',
      'mpx/valid-wx-if': 'error',
      'mpx/valid-wx-else': 'error',
      'mpx/valid-wx-elif': 'error',
      'mpx/valid-wx-model': 'error',
      // 'mpx/script-setup-uses-vars': 'error',
      'mpx/valid-initdata': 'warn',
      'mpx/valid-setup-define-expose': 'error',
      'mpx/no-deprecated-mpx-createfunction': 'error',
      'mpx/no-deprecated-watch-second-param': 'error',
      'mpx/no-deprecated-lifecycle': 'error'
    }
  }
]
