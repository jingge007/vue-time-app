<template>
  <div class="swiper_box">
    <van-swipe :autoplay="autoplay">
      <van-swipe-item v-for="(item, index) in imgData" :key="index">
        <img :src="item.img" class="swiper_img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSwiper} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        imgData: [],
        autoplay: 3000
      }
    },
    created() {
      this._getSwiper()
    },
    methods: {
      _getSwiper() {
        getSwiper().then((res) => {
          if (res.status == STATUS) {
            this.imgData = res.data.topPosters
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .swiper_box {
    width: 100%;
    height: 394px
    background-color: #F3F3F3
    .swiper_img {
      width: 100%;
      height: 100%
    }
  }
</style>
