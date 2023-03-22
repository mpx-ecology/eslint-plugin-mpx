/**
 * @author pagnkelly
 * See LICENSE file in root directory for full license.
 */
'use strict'

const utils = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'pageShow/pageHide废弃的生命周期',
      categories: ['composition-api-essential'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/no-deprecated-lifecycle.html'
    },
    fixable: 'code',
    schema: [],
    messages: {
      deprecatedPageShow:
        'The `pageShow` lifecycle hook is deprecated. Use `pageLifetimes.show` instead.',
      deprecatedPageHide:
        'The `pageHide` lifecycle hook is deprecated. Use `pageLifetimes.hide` instead.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.executeOnMpx(context, (obj) => {
      const pageShow = utils.findProperty(obj, 'pageShow')
      if (pageShow) {
        context.report({
          node: pageShow.key,
          messageId: 'deprecatedPageShow'
        })
      }

      const pageHide = utils.findProperty(obj, 'pageHide')
      if (pageHide) {
        context.report({
          node: pageHide.key,
          messageId: 'deprecatedPageHide'
        })
      }
    })
  }
}
