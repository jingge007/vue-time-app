<template>
  <div class="time_index">
    <scroll :data="newsList"
            :probeType="probeType"
            :listenScroll="listenScroll"
            class="list_scroll"
            :pullup="pullup"
            @scrollToEnd="loadMore"
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
        <newlist :newsList="newsList"></newlist>
        <!--加载更多数据的动画-->
        <div class="load_more" v-if="moreData">
          <img src="../../assets/loading.gif" class="more_img" alt="">
          <span>加载中...</span>
        </div>
        <div class="no_more" v-else>没有更多数据</div>
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
  import {timer} from 'common/js/public_time'
  import loading from 'base/loading/loading'

  export default {
    data() {
      return {
        fullScreen: false,
        newsList: [],
        probeType: 3,
        listenScroll: true,
        loadingFlag: true,
        moreData: true,
        page: 1,
        pullup: true,           // 支持上拉加载更多数据
      }
    },
    created() {
      this._getNew();
    },
    methods: {
      // 获取新闻列表的数据
      _getNew() {
        getNew(this.page).then((res) => {
          if (res.status == STATUS) {
            this.timeStamp(res.data.newsList)
            this._checkMore(res.data);
          }
        })
      },
      // 对新闻列表时间戳的处理
      timeStamp(data) {
        data.forEach((item, idx) => {
          if (item.publishTime) {
            item['timer'] = timer.dateDiff(item.publishTime)
          }
        })
        this.newsList = data;
      },
      // 加载更多的数据
      loadMore() {
        if (this.loadingFlag) {
          this.page += 1;
          this.loadingFlag = false;
          if (!this.moreData) {              // 当没有更多的数据的时候重置变量
            this.loadingFlag = true;
            return
          }
          getNew(this.page).then((res) => {
            if (res.status == STATUS) {
              let moreData = res.data.newsList;
              moreData.forEach((item, idx) => {
                if (item.publishTime) {
                  item['timer'] = timer.dateDiff(item.publishTime)
                }
              })
              this.newsList = this.newsList.concat(moreData);
              this._checkMore(res.data);
              this.loadingFlag = true;
            }
          })
        }
      },
      // 判断是否还有更多的数据
      _checkMore(data) {
        if (data.newsList.length < 0 || data.pageCount <= 0 || data.totalCount <= 0) {
          this.moreData = false;
        }
      }
    },
    components: {
      swiperBox,
      newlist,
      ticket,
      scroll,
      loading
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
