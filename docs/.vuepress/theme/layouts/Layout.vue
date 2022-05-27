<template>
  <BaseLayout v-bind="$attrs" v-on="$listeners">
    <slot name="sidebar-top" slot="sidebar-top" />
    <slot name="sidebar-bottom" slot="sidebar-bottom" />
    <template slot="page-top">
      <slot name="page-top" />
    </template>
    <slot name="page-bottom" slot="page-bottom" />
  </BaseLayout>
</template>

<script>
/**
 * Layout definition to navigate to older versions of the document.
 */
import BaseLayout from '@vuepress/theme-default/layouts/Layout.vue'
export default {
  name: 'MyLayout',
  components: {
    BaseLayout
  },
  computed: {}
}
</script>

<style scoped>
.beta-doc-description {
  padding-bottom: 0;
}
* ::v-deep .theme-default-content ~ .theme-default-content {
  padding-top: 0;
}
* ::v-deep .theme-default-content:not(.custom) h1 {
  margin-top: -3.1rem;
}
</style>
