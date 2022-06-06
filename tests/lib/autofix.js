'use strict'

const Linter = require('eslint').Linter
const parser = require('mpx-eslint-parser')
const assert = require('assert')

const rules = require('../..').rules

const baseConfig = {
  parser: 'mpx-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
}

describe('Complex autofix test cases', () => {
  const linter = new Linter()
  linter.defineParser('mpx-eslint-parser', parser)
  for (const key of Object.keys(rules)) {
    const ruleId = `mpx/${key}`
    linter.defineRule(ruleId, rules[key])
  }

  describe('Autofix of should not conflict.', () => {
    // const config = Object.assign({}, baseConfig, {
    //   rules: {
    //     // 'mpx/test': ['error']
    //   }
    // })

    // it('test output mpx', () => {
    //   const code = `<template><button>test</button></template>`
    //   const output = `<template><button>test-->mpx</button></template>`
    //   assert.equal(linter.verifyAndFix(code, config, 'test.mpx').output, output)
    // })
  })
})
