/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
'use strict'

module.exports = {
  rules: {
    camelcase: require('./rules/camelcase'),
    'comment-directive': require('./rules/comment-directive'),
    'html-end-tags': require('./rules/html-end-tags'),
    'no-dupe-keys': require('./rules/no-dupe-keys'),
    'no-dupe-wx-elif': require('./rules/no-dupe-wx-elif'),
    'no-duplicate-attributes': require('./rules/no-duplicate-attributes'),
    'no-reserved-keys': require('./rules/no-reserved-keys'),
    'no-side-effects-in-computed-properties': require('./rules/no-side-effects-in-computed-properties'),
    'valid-wx-elif': require('./rules/valid-wx-elif'),
    'valid-wx-else': require('./rules/valid-wx-else'),
    'valid-wx-for': require('./rules/valid-wx-for'),
    'valid-wx-if': require('./rules/valid-wx-if'),
    'valid-wx-model': require('./rules/valid-wx-model')
  },
  configs: {
    base: require('./configs/base'),
    'mpx-essential': require('./configs/mpx-essential')
  },
  processors: {
    '.mpx': require('./processor')
  }
}
