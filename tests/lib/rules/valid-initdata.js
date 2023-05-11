/**
 * @fileoverview initData检测
 * @author jvzuojing
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/valid-initdata')
const RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester({
  parser: require.resolve('mpx-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})
ruleTester.run('valid-initdata', rule, {
  valid: [
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const inc = () => {
          count.value++
        }
        defineExpose({
          inc
        })
        defineOptions({
          initData: {
            inc: 0
          }
        })
      </script>
      <template>
        <view bindtap="inc" />
        <abc inc="{{inc}}">
      </template>
      `
    },
    {
      filename: 'test.mpx',
      code: `
      <script>
          createComponent({
              initData: {
                  show: true,
                  num: 0,
                  inc: 0
              },
              computed: {
                  ...store.mapState(['count', 'num']),
                  inc() {
                      return 0
                  }
              }
          })
      </script>
      <template>
        <abc inc="{{inc}}" num="{{num}}" show="{{show}}">
      </template>
      `
    }
  ],

  invalid: [
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const inc = () => {
          count.value++
        }
        defineExpose({
          inc
        })
      </script>
      <template>
        <abc inc="{{inc}}">
      </template>
      `,
      errors: [{ messageId: 'missingValue' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <script setup>
        const inc = () => {
          count.value++
        }
        defineExpose({
          inc
        })
        defineOptions({
          initData: {
            a: 0
          }
        })
      </script>
      <template>
        <abc inc="{{inc}}">
      </template>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>
          <kf-mpx-dialog
            title="{{b}}"
          >
          </kf-mpx-dialog>
        </view>
      </template>
      <script>
      createComponent({
        initData: {
          commonDialogInfo: {
            content: {
              a: 1
            }
          }
        },
        computed: {
          ...Store.mapGetters([
            'b'
          ])
        }
      })
      </script>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>
          <kf-mpx-dialog
            title="{{commonDialogInfo}}"
          >
          </kf-mpx-dialog>
        </view>
      </template>
      <script>
      createComponent({
        initData: {
          a: 0
        },
        computed: {
          ...Store.mapGetters([
            'commonDialogInfo'
          ])
        }
      })
      </script>
      `,
      errors: [{ messageId: 'unexpected' }]
    },
    {
      filename: 'test.mpx',
      code: `
      <template>
        <view>
          <kf-mpx-dialog
            title="{{commonDialogInfo}}"
          >
          </kf-mpx-dialog>
        </view>
      </template>
      <script>
      createComponent({
        computed: {
          ...Store.mapGetters([
            'commonDialogInfo'
          ]),
          a() {
            return 0
          }
        }
      })
      </script>
      `,
      errors: [{ messageId: 'missingValue' }]
    }
  ]
})
