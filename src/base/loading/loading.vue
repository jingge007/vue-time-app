<template>
  <div>
    <!--全面屏时加载的动画-->
    <div class="loading" v-show="fullScreen">
      <img src="../../assets/loading.gif" alt="">
    </div>
    <!--加载更多数据的动画-->
    <div class="load_more" v-show="loadMore">
      <img src="../../assets/loading.gif" class="more_img" alt="">
      <span>加载中...</span>
    </div>
    <div class="no_more" v-show="!loadMore && !fullScreen">没有更多数据</div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      fullScreen: {
        type: Boolean,
        default: false
      },
      loadMore: {
        type: Boolean,
        default: false
      }
    }
  }
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

  .load_more, .no_more {
    display: flex
    align-items center
    justify-content center
    font-size 30px
    text-align: center
    color #333
    .more_img {
      width: 100px
      height: 100px
      display: inline-block
    }
  }

  .no_more {
    padding 20px 0
  }
</style>


