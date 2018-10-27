<template>
  <transition name="back">
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .back-enter-active, .back-leave-active {
    transition all 0.3s
  }

  .back-enter, .back-leave-to {
    transform translate3d(-100%, 0, 0)
  }
</style>
