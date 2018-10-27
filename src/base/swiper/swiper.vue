<template>
  <div class="swiper_box">
    <swiper :options="swiperOption" ref="mySwiper" v-if="Img_data.length">
      <swiper-slide v-for="(item,index) in Img_data" :key="index">
        <img class="swiper_img" :src="item.img" alt="">
      </swiper-slide>
      <div class="swiper-pagination " slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSwiper} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        Img_data: [],
        swiperOption: {
          notNextTick: true,      //循环播放
          loop: true,
          initialSlide: 0,       //设定初始化时slide的索引
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          effect: 'slide',       // 设置轮播切换效果
          speed: 800,           //滑动速度
          direction: 'horizontal',    //滑动方向
          //分页器设置
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    created() {
      this._getSwiper()
    },
    methods: {
      _getSwiper() {
        getSwiper().then((res) => {
          if (res.status == STATUS) {
            this.Img_data = res.data.topPosters
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .swiper_box /deep/ .swiper-pagination-bullet {
    background #ccc
  }

  .swiper_box /deep/ .swiper-pagination-bullet-active {
    background #fff
  }

  .swiper_box {
    width: 100%;
    height: 394px
    .swiper_img {
      width: 100%;
      height: 100%
    }
  }
</style>
