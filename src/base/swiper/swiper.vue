<template>
  <div class="swiper_box">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in Img_data" :key="index">
        <!--<img :src="item.img" alt="">-->
        <div>{{index}}</div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination " slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        Img_data: [
          {img: 'assets/images/swiper_01.jpg'},
          {img: 'assets/images/swiper_02.jpg'},
          {img: 'assets/images/swiper_03.jpg'},
          {img: 'assets/images/swiper_04.jpg'},
          {img: 'assets/images/swiper_05.jpg'}
        ],
        swiperOption: {
          notNextTick: true,      //循环播放
          loop: true,
          initialSlide: 0,       //设定初始化时slide的索引
          autoplay: {
            delay: 50000,
          },
          effect: 'slide',       // 设置轮播切换效果
          speed: 800,           //滑动速度
          direction: 'horizontal',    //滑动方向
          //分页器设置
          pagination: {
            el: '.swiper-pagination'
          }
        },
        // swiperSlides: [1, 2, 3, 4]
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .swiper_box {
    width: 100%
    height: 250px
  }
</style>
