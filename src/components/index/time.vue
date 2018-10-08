<template>
  <div class="time_index">
    <swiper-box></swiper-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiperBox from 'base/swiper/swiper'

  export default {
    components: {
      swiperBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .time_index {
    width: 100%
    height: 100%
    background-color: #fff
  }
</style>
