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
        <view class="kf-common-dialog-wrapper">
          <kf-mpx-dialog
            wx:ref="dialog"
            kf="true"
            title="{{commonDialogInfo.title}}"
            headIconUrl="{{commonDialogInfo.headIconUrl}}"
            content="{{commonDialogInfo.content}}"
            contentStyle="{{commonDialogInfo.contentStyle}}"
            cancelText="{{commonDialogInfo.cancelText || '取消'}}"
            confirmText="{{commonDialogInfo.confirmText || '确定'}}"
            confirmColor="{{commonDialogInfo.confirmColor || '#FE01A2'}}"
            cancelColor="{{commonDialogInfo.cancelColor || '#666666'}}"
            allTitle="{{commonDialogInfo.allTitle}}"
            showTextArea="{{showTextArea}}"
            type="{{commonDialogInfo.type || 'confirm'}}"
            specialStyle="{{commonDialogInfo.specialStyle || 'color:#FF00AA;'}}"
            bind:cancel="dialogCancel"
            bind:confirm="dialogConfirm"
          >
            <view slot="extra" wx:if="{{commonDialogInfo.img_url}}">
              <image src="{{commonDialogInfo.img_url}}" class="full-img" mode="widthFix" style="{{commonDialogInfo.imgStyle}}"/>
            </view>
            <view class="sub-content" slot="content" wx:if="{{commonDialogInfo.subContent}}">
              <view class="content-link" wx:if="{{commonDialogInfo.subContent.link && commonDialogInfo.subContent.text}}" bindtap="jumpLink">{{commonDialogInfo.subContent.text}}<mpx-kf-icon type="click"></mpx-kf-icon></view>
            </view>
            <!-- 列表 -->
            <view class="sub-list" slot="content" wx:if="{{commonDialogInfo.subList}}">
              <view wx:for="{{commonDialogInfo.subList}}" class="sub-list-item">
                {{item}}
              </view>
            </view>
            <!-- 倒计时 -->
            <view class="countdown-content" slot="content" wx:if="{{countdownContent}}">
              <special-text text="{{countdownContent}}" rules="{{rule}}" />
            </view>
          </kf-mpx-dialog>
        </view>
      </template>
      <script>
      import { createComponent } from '@mpxjs/core'
      import * as commonApi from 'commonApi/index'
      import Store from 'store'
      import { getCountdownInstance } from 'common/js/time-counter'

      const omega = getApp().Omega
      const containerWidth = commonApi.getSystemInfo().windowWidth * 0.75

      let countdownInstance

      createComponent({
        data:{
          min: 0,
          sec: 0,
          countdownText: ''
        },
        watch: {
          'commonDialogInfo.countdownTime':{
            handler (val, oldV) {
              // 同时存在多个实例共享了store的数据
              if (val && val !== oldV && this.page === 'estimate') {
                this.startCountdown(val)
              }
            }
          }
        },
        initData: {
          commonDialogInfo: {
            content: {
              a: 1
            },
            contentStyle: '',
            headIconUrl: ''
          }
        },
        computed: {
          ...Store.mapGetters([
            'commonDialogInfo'
          ]),
          showTextArea () {
            return !(this.commonDialogInfo.pop_type === 1)
          },
          fullImgHeight () {
            if (this.commonDialogInfo.img_ratio) {
              return containerWidth * this.commonDialogInfo.img_ratio
            } else {
              return 0
            }
          },
          countdownContent () {
            return this.commonDialogInfo.countdownContent?.replace('%s', this.countdownText)
          },
          rule () {
            return {
              '{x}': {
                style: this.commonDialogInfo.specialStyle || 'color:#FF00AA;'
              }
            }
          },
        },
        properties: {
          event: {
            type: String,
            default: ''
          },
          page: String
        },
        attached () {
          this.register()
        },
        detached () {
          this.unregister()
        },
        pageLifetimes: {
          show () {
            this.register()
          },
          hide () {
            this.unregister()
          }
        },
        methods: {
          dialogConfirm() {
            typeof this.commonDialogInfo.onConfirm === 'function' && this.commonDialogInfo.onConfirm()
            this.clearCountdown()
            this.commonDialogInfo?.popup_type && omega.trackEvent('kf_bubble_popup_bt_ck', {
              popup_type: this.commonDialogInfo.popup_type,
              text: this.commonDialogInfo.confirmText || '确定'
            })
          }
        }
      })
      </script>
      <script type="application/json">
        {
          "component": true,
          "usingComponents": {
            "kf-mpx-dialog": "@didi/mpx-ui/src/components/kf-dialog/kf-dialog?root=mpx-ui",
            "mpx-kf-icon": "@didi/mpx-ui/src/components/kf-icon/kf-icon?root=mpx-ui",
            "special-text": "@didi/mpx-ui/src/components/special-text/index?root=mpx-ui"
          },
          "componentPlaceholder": {
            "kf-mpx-dialog": "view",
            "special-text": "view",
            "mpx-kf-icon": "view"
          }
        }
      </script>
      `,
      errors: [
        { messageId: 'unexpected' },
        { messageId: 'unexpected' },
        { messageId: 'unexpected' },
        { messageId: 'unexpected' },
        { messageId: 'unexpected' }
      ]
    }
  ]
})
