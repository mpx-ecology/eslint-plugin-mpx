/**
 * @author pagnkelly
 * See LICENSE file in root directory for full license.
 */
'use strict'

const utils = require('../utils')

/**
 * @param {RuleFixer} fixer
 * @param {Property} property
 * @param {string} newName
 */
function fix(fixer, property, newName) {
  if (property.computed) {
    if (
      property.key.type === 'Literal' ||
      property.key.type === 'TemplateLiteral'
    ) {
      return fixer.replaceTextRange(
        [property.key.range[0] + 1, property.key.range[1] - 1],
        newName
      )
    }
    return null
  }
  if (property.shorthand) {
    return fixer.insertTextBefore(property.key, `${newName}:`)
  }
  return fixer.replaceText(property.key, newName)
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'pageShow/pageHide废弃的生命周期',
      categories: ['vue3-essential'],
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
      const pageLifetimes = utils.findProperty(obj, 'pageLifetimes')
      if (pageShow) {
        console.log(pageShow, 'pageShow')
        context.report({
          node: pageShow.key,
          messageId: 'deprecatedPageShow',
          fix(fixer) {
            if (!pageLifetimes) {
              fixer.insertTextBefore(pageShow.key, `pageLifetimes: {\n`)

              fixer.insertTextAfter(pageShow.key, `}`)
            }
            return fix(fixer, pageShow, 'show')
          }
        })
      }

      const pageHide = utils.findProperty(obj, 'pageHide')
      if (pageHide) {
        context.report({
          node: pageHide.key,
          messageId: 'deprecatedPageHide',
          fix(fixer) {
            return fix(fixer, pageHide, 'hide')
          }
        })
      }
    })
  }
}
