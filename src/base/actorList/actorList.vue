<template>
  <div class="actor_list">
    <div class="actor_box">
      <div class="purchase_nav">
        <div class="purchase_nav_left">导演/主要演员</div>
        <div class="purchase_nav_right">
          <span>全部</span>
          <i class="iconfont icon-zuoyoujiantou"></i>
        </div>
      </div>
      <div class="cross_swiper">
        <scroll :scrollX="this.scrollX" :eventPassthrough="this.eventPassthrough" ref="scroll" :click="this.click">
          <div ref="img_box" class="swiper_box">
            <div class="swiper_item" v-for="(item,index) in actorList" :key="index">
              <img :src="item.img" alt="" clsaa="">
              <p class="name">{{item.name}}</p>
              <p class="name">{{item.nameEn}}</p>
              <p class="name" v-show="index !=0">{{'饰：'+item.roleName}}</p>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'

  export default {
    props: {
      actorList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        eventPassthrough: 'vertical',           // 忽略better-scroll垂直滚动的方向
        scrollX: true,
        click: false
      }
    },
    watch: {
      actorList() {
        // 计算左右滑动模块的宽度
        let picWidth = 125
        let margin = 15
        let width = (picWidth + margin) * this.actorList.length - margin
        this.$refs.img_box.style.width = width + 'px'
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .actor_list {
    width: 100%
    margin 25px 0
    background-color: #fff
    .actor_box {
      padding 25px 20px
      .purchase_nav {
        display: flex
        align-items center
        justify-content space-between
        font-size 32px
        .purchase_nav_left {
          color #333
        }
        .purchase_nav_right {
          display: flex
          align-items center
          color #9CA19F
          .icon-zuoyoujiantou {
            font-size 40px
            padding-bottom 6px
            color #9CA19F
          }
        }
      }
      .cross_swiper {
        margin-top 15px
        width: 100%
        overflow: hidden
        .swiper_box {
          display: flex
          .swiper_item {
            width: 250px
            border-radius 2px
            margin-right 30px
            overflow: hidden
            text-align: center
            img {
              width: 100%
              height: 300px
              border-radius 2px
              display: inline-block
              background-color: #ccc
            }
            .name {
              display: block
              color: #333
              font-size 25px
              no-wrap()
              margin-top 8px
            }
          }
          .swiper_item:last-child {
            margin-right 0px !important
          }
        }
      }
    }
  }
</style>
