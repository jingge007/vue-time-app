<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <footer-tab></footer-tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import footerTab from 'base/footerTab/footerTab'

  export default {
    name: 'App',
    components: {
      footerTab
    }
  }
</script>

<style>

</style>
