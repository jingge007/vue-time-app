<template>
  <div id="app">
    <footer-tab></footer-tab>
    <router-view/>
  </div>
</template>

<script>
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
