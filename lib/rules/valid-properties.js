/**
 * @author pagnkelly
 * @copyright 2020 pagnkelly. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require("../utils")

/**
 * @typedef {import("../utils").ComponentObjectProp} ComponentObjectProp
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
// 校验properties是否符合预期
/** 默认允许的key */
const DEFAULT_KEYS = ["type", "value", "optionalTypes", "observer"] 
/**
 * check prop
 * @param {Property} node 
 * @returns 
 */
/**
 * 
 * @param {Property} node 
 * @param {RuleContext} context 
 * @param {string[]} allowKeys 
 * @returns 
 */
function validProp(node, context, allowKeys) {
  if(!node) return
  const sourceCode = context.getSourceCode()
  const propName = sourceCode.getText(node.key)
  if(!node.value) {
    return context.report({
      node: node,
      message:
        "The value of '{{propName}}' cannot be empty.",
      data: {
        propName
      }
    })
  }
  if(node.value.type === "ObjectExpression"){
    if(!node.value.properties.length) {
      return context.report({
        node: node.value,
        message:
          "The value of '{{propName}}' cannot be empty object.",
        data: {
          propName
        }
      })
    }
    let hasType = 0
    node.value.properties.forEach((item)=>{
      if(item.type !== "Property") return
      const keyName = sourceCode.getText(item.key)
      if(!allowKeys.includes(keyName)){
        context.report({
          node: item,
          message:
            "Property '{{propName}}' has invalid key '{{keyName}}'.",
          data: {
            propName,
            keyName
          }
        })
      } else if(keyName === "type") {
        hasType = 1
      }
    })
    if(!hasType) {
      context.report({
        node: node.value,
        message:
          "Property '{{propName}}' requires 'type' key.",
        data: {
          propName
        }
      })
    }
  } else if(node.value.type !== "Identifier"){
    return context.report({
      node,
      message:
        "Invalid value for '{{propName}}'.",
      data: {
        propName
      }
    })
  }

}
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce that a return statement is present in computed property",
      categories: ["mpx-essential"],
      url: "https://mpx-ecology.github.io/eslint-plugin-mpx/rules/valid-properties.html"
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: "object",
        properties: {
          allowKeys: {
            type: "array"
          }
        }
      }
    ]
  },
  /** @param {RuleContext} context */
  create(context) {
    const options = context.options[0] || {}
    const allowKeys = options.allowKeys || DEFAULT_KEYS
    const isScriptSetup = utils.isScriptSetup(context)
   
    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    if (isScriptSetup) {
      return utils.defineTemplateBodyVisitor(context, {},{
        /**
         * @param {ObjectExpression} node 
         */
        "CallExpression[callee.name='defineProps'] > ObjectExpression"(node) {
          for (const prop of utils.getComponentPropsFromDefine(node)) {
            prop.type === "object" && validProp(prop.node,context,allowKeys)
          }
        }
      })
    } else {
      return utils.defineMpxVisitor(context, {
        onMpxObjectEnter(obj) {
          for (const prop of utils.getComponentPropsFromOptions(obj)) {
            prop.type === "object" && validProp(prop.node,context,allowKeys)
          }
        }
      })
    }
  }
  
}
