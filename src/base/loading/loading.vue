<template>
  <div class="loading">
    <img src="../../assets/loading.gif" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .loading {
    position: absolute
    top: 42%
    left: 50%
    transform translate(-50%, -50%)
    img {
      width: 200px
      height: 200px
      display: block
    }
  }
</style>


