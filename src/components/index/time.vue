<template>
  <div class="time_index">
    <scroll :data="newsList"
            :probeType="probeType"
            :listenScroll="listenScroll"
            class="list_scroll"
    >
      <div>
        <!--搜索框-->
        <div class="search">
          <i class="iconfont icon-sousuo"></i>
          <p class="search_item">影片/影院/影人，任你搜...</p>
        </div>
        <!--轮播图-->
        <swiper-box></swiper-box>
        <!--热映购票-->
        <ticket></ticket>
        <!--新闻列表-->
        <newlist></newlist>
      </div>
    </scroll>
  </div>


</template>

<script type="text/ecmascript-6">
  import swiperBox from 'base/swiper/swiper'
  import newlist from 'base/newList/newList'
  import ticket from 'components/TicketPurchase/TicketPurchase'
  import scroll from 'base/scroll/scroll'
  import {getNew} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        newsList: [],
        probeType: 3,
        listenScroll: true,
      }
    },
    created() {
      this._getNew()
    },
    methods: {
      _getNew() {
        getNew().then((res) => {
          if (res.status == STATUS) {
            this.newsList = res.data.newsList;
          }
        })
      },
    },
    components: {
      swiperBox,
      newlist,
      ticket,
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .time_index {
    width: 100%
    background-color: #fff
    position: fixed
    top: 0
    bottom: 110px
    overflow: hidden
    .list_scroll {
      position: relative
      height: 100%
      overflow: hidden
    }
    .search {
      padding 15px 30px
      display: flex
      align-items center
      position: relative
      background-color: #1D2634
      .search_item {
        background-color: #fff
        height: 70px
        line-height: 70px
        border 1px solid #BDBDBD
        border-radius 10px
        padding-left 70px
        color #A3A3A4
        font-size 32px
        width: 100%
      }
      .icon-sousuo {
        font-size 40px
        position: absolute
        top: 50%
        left: 45px
        transform translateY(-50%)
        color #BEBEBE
      }
    }
  }
</style>
