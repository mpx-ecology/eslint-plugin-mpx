/**
 * @fileoverview Internal rule to prevent missing or invalid meta property in core rules.
 * @author Vitor Balocco
 */

'use strict'

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
 * Extracts the `meta` property from the ObjectExpression that all rules export.
 *
 * @param {ASTNode} exportsNode ObjectExpression node that the rule exports.
 * @returns {ASTNode} The `meta` Property node or null if not found.
 */
function getMetaPropertyFromExportsNode(exportsNode) {
  return getPropertyFromObject('meta', exportsNode)
}

/**
 * Whether this `meta` ObjectExpression has a `docs` property defined or not.
 *
 * @param {ASTNode} metaPropertyNode The `meta` ObjectExpression for this rule.
 * @returns {boolean} `true` if a `docs` property exists.
 */
function hasMetaDocs(metaPropertyNode) {
  return Boolean(getPropertyFromObject('docs', metaPropertyNode.value))
}

/**
 * Whether this `meta` ObjectExpression has a `docs.description` property defined or not.
 *
 * @param {ASTNode} metaPropertyNode The `meta` ObjectExpression for this rule.
 * @returns {boolean} `true` if a `docs.description` property exists.
 */
function hasMetaDocsDescription(metaPropertyNode) {
  const metaDocs = getPropertyFromObject('docs', metaPropertyNode.value)

  return metaDocs && getPropertyFromObject('description', metaDocs.value)
}

/**
 * Whether this `meta` ObjectExpression has a `docs.category` property defined or not.
 *
 * @param {ASTNode} metaPropertyNode The `meta` ObjectExpression for this rule.
 * @returns {boolean} `true` if a `docs.category` property exists.
 */
function hasMetaDocsCategories(metaPropertyNode) {
  const metaDocs = getPropertyFromObject('docs', metaPropertyNode.value)

  return metaDocs && getPropertyFromObject('categories', metaDocs.value)
}

/**
 * Whether this `meta` ObjectExpression has a `schema` property defined or not.
 *
 * @param {ASTNode} metaPropertyNode The `meta` ObjectExpression for this rule.
 * @returns {boolean} `true` if a `schema` property exists.
 */
function hasMetaSchema(metaPropertyNode) {
  return getPropertyFromObject('schema', metaPropertyNode.value)
}

/**
 * Checks the validity of the meta definition of this rule and reports any errors found.
 *
 * @param {RuleContext} context The ESLint rule context.
 * @param {ASTNode} exportsNode ObjectExpression node that the rule exports.
 * @param {boolean} ruleIsFixable whether the rule is fixable or not.
 * @returns {void}
 */
function checkMetaValidity(context, exportsNode) {
  const metaProperty = getMetaPropertyFromExportsNode(exportsNode)

  if (!metaProperty) {
    context.report(exportsNode, 'Rule is missing a meta property.')
    return
  }

  if (!hasMetaDocs(metaProperty)) {
    context.report(metaProperty, 'Rule is missing a meta.docs property.')
    return
  }

  if (!hasMetaDocsDescription(metaProperty)) {
    context.report(
      metaProperty,
      'Rule is missing a meta.docs.description property.'
    )
    return
  }

  if (!hasMetaDocsCategories(metaProperty)) {
    context.report(
      metaProperty,
      'Rule is missing a meta.docs.categories property.'
    )
    return
  }

  if (!hasMetaSchema(metaProperty)) {
    context.report(metaProperty, 'Rule is missing a meta.schema property.')
  }
}

/**
 * Whether this node is the correct format for a rule definition or not.
 *
 * @param {ASTNode} node node that the rule exports.
 * @returns {boolean} `true` if the exported node is the correct format for a rule definition
 */
function isCorrectExportsFormat(node) {
  return node != null && node.type === 'ObjectExpression'
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce correct use of `meta` property in core rules',
      categories: ['Internal']
    },

    schema: [],
    messages: {
      rule: 'Rule does not export an Object. Make sure the rule follows the new rule format.'
    }
  },

  create(context) {
    let exportsNode

    return {
      AssignmentExpression(node) {
        if (
          node.left &&
          node.right &&
          node.left.type === 'MemberExpression' &&
          node.left.object.name === 'module' &&
          node.left.property.name === 'exports'
        ) {
          exportsNode = node.right
        }
      },

      'Program:exit'(programNode) {
        if (!isCorrectExportsFormat(exportsNode)) {
          context.report({
            node: exportsNode || programNode,
            messageId: 'rule'
          })
          return
        }

        checkMetaValidity(context, exportsNode)
      }
    }
  }
}
