/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/140
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

const DEFAULT_ORDER = Object.freeze([['script', 'template'], 'style'])

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce order of component top-level elements',
      categories: ['recommended'],
      url: 'https://mpx-ecology.github.io/eslint-plugin-mpx/rules/component-tags-order.html'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          order: {
            type: 'array',
            items: {
              anyOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' }, uniqueItems: true }
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        }
      }
    ],
    messages: {
      unexpected:
        'The <{{name}}> should be above the <{{firstUnorderedName}}> on line {{line}}.'
    }
  },
  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    /** @type {Map<string, number>} */
    const orderMap = new Map()
    /** @type {(string|string[])[]} */
    const orderOptions =
      (context.options[0] && context.options[0].order) || DEFAULT_ORDER
    for (const [index, nameOrNames] of orderOptions.entries()) {
      if (Array.isArray(nameOrNames)) {
        for (const name of nameOrNames) {
          orderMap.set(name, index)
        }
      } else {
        orderMap.set(nameOrNames, index)
      }
    }

    /**
     * @param {string} name
     */
    function getOrderPosition(name) {
      const num = orderMap.get(name)
      return num == null ? -1 : num
    }
    const sourceCode = context.getSourceCode()
    const documentFragment =
      sourceCode.parserServices.getDocumentFragment &&
      sourceCode.parserServices.getDocumentFragment()

    function getTopLevelHTMLElements() {
      if (documentFragment) {
        return documentFragment.children.filter(utils.isVElement)
      }
      return []
    }

    /**
     * @param {VElement} element
     * @param {VElement} firstUnorderedElement
     */
    function report(element, firstUnorderedElement) {
      context.report({
        node: element,
        loc: element.loc,
        messageId: 'unexpected',
        data: {
          name: element.name,
          firstUnorderedName: firstUnorderedElement.name,
          line: firstUnorderedElement.loc.start.line
        }
      })
    }

    return {
      Program(node) {
        if (utils.hasInvalidEOF(node)) {
          return
        }
        const elements = getTopLevelHTMLElements()

        for (const [index, element] of elements.entries()) {
          const expectedIndex = getOrderPosition(element.name)
          if (expectedIndex < 0) {
            continue
          }
          const firstUnordered = elements
            .slice(0, index)
            .filter((e) => expectedIndex < getOrderPosition(e.name))
            .sort(
              (e1, e2) => getOrderPosition(e1.name) - getOrderPosition(e2.name)
            )[0]
          if (firstUnordered) {
            report(element, firstUnordered)
          }
        }
      }
    }
  }
}
