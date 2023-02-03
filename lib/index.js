/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
'use strict'

module.exports = {
  rules: {
    'comment-directive': require('./rules/comment-directive'),
    'component-tags-order': require('./rules/component-tags-order'),
    'html-end-tags': require('./rules/html-end-tags'),
    'no-arrow-functions-in-watch': require('./rules/no-arrow-functions-in-watch'),
    'no-async-in-computed-properties': require('./rules/no-async-in-computed-properties'),
    'no-dupe-keys': require('./rules/no-dupe-keys'),
    'no-dupe-wx-elif': require('./rules/no-dupe-wx-elif'),
    'no-duplicate-attributes': require('./rules/no-duplicate-attributes'),
    'no-parsing-error': require('./rules/no-parsing-error'),
    'no-reserved-keys': require('./rules/no-reserved-keys'),
    'no-side-effects-in-computed-properties': require('./rules/no-side-effects-in-computed-properties'),
    'return-in-computed-property': require('./rules/return-in-computed-property'),
    'valid-wx-elif': require('./rules/valid-wx-elif'),
    'valid-wx-else': require('./rules/valid-wx-else'),
    'valid-wx-if': require('./rules/valid-wx-if'),
    'valid-wx-model': require('./rules/valid-wx-model'),
    'script-setup-uses-vars': require('./rules/script-setup-uses-vars'),
    eqeqeq: require('./rules/eqeqeq'),
    'script-indent': require('./rules/script-indent'),
    'valid-swiper-item-style': require('./rules/valid-swiper-item-style'),
    'valid-wx-key': require('./rules/valid-wx-key'),
    'valid-attribute-value': require('./rules/valid-attribute-value'),
    'valid-attribute-quote': require('./rules/valid-attribute-quote'),
    'valid-component-range': require('./rules/valid-component-range')
  },
  configs: {
    base: require('./configs/base'),
    'mpx-essential': require('./configs/mpx-essential'),
    'composition-api-essential': require('./configs/composition-api-essential')
  },
  processors: {
    '.mpx': require('./processor')
  }
}
