/**
 * @fileoverview Internal rule to enforce meta.docs.description conventions.
 * @author Vitor Balocco
 */

'use strict'

const ALLOWED_FIRST_WORDS = ['enforce', 'require', 'disallow']

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Gets the property of the Object node passed in that has the name specified.
 *
 * @param {string} property Name of the property to return.
 * @param {ASTNode} node The ObjectExpression node.
 * @returns {ASTNode} The Property node or null if not found.
 */
function getPropertyFromObject(property, node) {
  if (node && node.type === 'ObjectExpression') {
    const properties = node.properties

    for (const property_ of properties) {
      if (property_.key.name === property) {
        return property_
      }
    }
  }
  return null
}

/**
 * Verifies that the meta.docs.description property follows our internal conventions.
 *
 * @param {RuleContext} context The ESLint rule context.
 * @param {ASTNode} exportsNode ObjectExpression node that the rule exports.
 * @returns {void}
 */
function checkMetaDocsDescription(context, exportsNode) {
  if (exportsNode.type !== 'ObjectExpression') {
    // if the exported node is not the correct format, "internal-no-invalid-meta" will already report this.
    return
  }

  const metaProperty = getPropertyFromObject('meta', exportsNode)
  const metaDocs =
    metaProperty && getPropertyFromObject('docs', metaProperty.value)
  const metaDocsDescription =
    metaDocs && getPropertyFromObject('description', metaDocs.value)

  if (!metaDocsDescription) {
    // if there is no `meta.docs.description` property, "internal-no-invalid-meta" will already report this.
    return
  }

  const description = metaDocsDescription.value.value

  if (typeof description !== 'string') {
    context.report({
      node: metaDocsDescription.value,
      message: '`meta.docs.description` should be a string.'
    })
    return
  }

  if (description === '') {
    context.report({
      node: metaDocsDescription.value,
      message: '`meta.docs.description` should not be empty.'
    })
    return
  }

  if (description.indexOf(' ') === 0) {
    context.report({
      node: metaDocsDescription.value,
      message: '`meta.docs.description` should not start with whitespace.'
    })
    return
  }

  const firstWord = description.split(' ')[0]

  if (!ALLOWED_FIRST_WORDS.includes(firstWord)) {
    context.report({
      node: metaDocsDescription.value,
      messageId: 'description',
      data: {
        allowedWords: ALLOWED_FIRST_WORDS.join(', '),
        firstWord
      }
    })
  }

  if (description.endsWith('.')) {
    context.report({
      node: metaDocsDescription.value,
      message: '`meta.docs.description` should not end with `.`.',
      fix(fixer) {
        const pos = metaDocsDescription.range[1] - 2
        return fixer.removeRange([pos, pos + 1])
      }
    })
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'enforce correct conventions of `meta.docs.description` property in core rules',
      categories: ['Internal']
    },
    // eslint-disable-next-line eslint-plugin/require-meta-fixable
    fixable: 'code',
    schema: [],
    messages: {
      description:
        '`meta.docs.description` should start with one of the following words: {{ allowedWords }}. Started with "{{ firstWord }}" instead.'
    }
  },

  create(context) {
    return {
      AssignmentExpression(node) {
        if (
          node.left &&
          node.right &&
          node.left.type === 'MemberExpression' &&
          node.left.object.name === 'module' &&
          node.left.property.name === 'exports' &&
          node.right.type === 'ObjectExpression'
        ) {
          checkMetaDocsDescription(context, node.right)
        }
      }
    }
  }
}
