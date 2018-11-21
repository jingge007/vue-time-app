<template>
  <div class="ticket">
    <div class="purchase_nav">
      <div class="purchase_nav_left">
        <span class="txt">热映购票·</span>
        <span @click="getCity">{{cityName}}</span>
        <i class="iconfont icon-down_arrow"></i>
      </div>
      <div class="purchase_nav_right">
        <span>{{ticketsData.length+'部'}}</span>
        <i class="iconfont icon-zuoyoujiantou"></i>
      </div>
    </div>
    <div class="cross_swiper">
      <scroll :scrollX="this.scrollX" :eventPassthrough="this.eventPassthrough" ref="scroll" :click="this.click">
        <div ref="img_box" class="swiper_box">
          <div class="swiper_item" v-if="hotTicketData.length" v-for="(item,index) in hotTicketData" :key="index" @click="movieBtn(item)">
            <img :src="item.img" alt="">
            <span class="score" v-show="item.r>0">{{normalizeScore(item.r)}}</span>
            <div class="isNew" v-show="item.isNew">最新</div>
            <h2 class="movie_title">{{item.tCn}}</h2>
            <span class="ticket_btn">购票</span>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import getCityName from 'common/js/getUserLocation'
  import {getIndex} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import {mapGetters, mapMutations} from 'vuex'
  import scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        ticketsData: [],
        cityName: '',
        hotTicketData: [],
        eventPassthrough: 'vertical',           // 忽略better-scroll垂直滚动的方向
        scrollX: true,
        click: false
      }
    },
    mounted() {
      this.$refs.scroll.refresh()
    },
    created() {
      this._getIndex();

    },
    computed: {
      ...mapGetters({
        cityData: 'cityData',
        city_id: 'city_id'
      })
    },
    methods: {
      // 获取热映购票的数据
      _getIndex() {
        if (Object.keys(this.cityData).length != 0) {
          this.cityName = this.cityData.n
          this.set_city_id(this.cityData.id);
          getIndex(this.cityData.id).then((res) => {
            if (res.status == STATUS) {
              this.ticketsData = res.data.ms
              // this.ticketsData['score'] =
              this.hotTicketData = this.ticketsData.slice(0, 15)
            }
          })
        } else {
          // 获取当前城市
          getCityName().then((city) => {
            this.cityName = city.slice(0, 2);
            getIndex(this.city_id).then((res) => {
              if (res.status == STATUS) {
                this.ticketsData = res.data.ms
                this.hotTicketData = this.ticketsData.slice(0, 15)
              }
            })
          })
        }
      },
      ...mapMutations({
        set_footer_talg: 'SET_FOOTER_TALG',
        set_city_id: 'SET_CITY_ID'
      }),
      // 点击进入选择城市列表页
      getCity() {
        this.$router.push('/citylist');
        let talg = false;
        this.set_footer_talg(talg);
      },
      // 进入电影详情页
      movieBtn(data) {
        this.$router.push({
          path: `/movie_details/${data.movieId}`
        })
      },
      // 电影评分末尾补零
      normalizeScore(item) {
        let len = item.toString().length
        if (len < 2) {
          return `${item}.0`
        }
        return item
      }
    },
    watch: {
      ticketsData() {
        // 计算左右滑动模块的宽度
        let picWidth = 110
        let margin = 7
        let width = (picWidth + margin) * this.hotTicketData.length - margin
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
  .ticket {
    padding 0 20px
    .purchase_nav {
      display: flex
      justify-content space-between
      font-size 30px
      color #9D9D9E
      height: 60px
      align-items center
      .purchase_nav_left {
        display: flex
        align-items center
        .txt {
          color #333
          font-weight 600
        }
        .icon-down_arrow {
          font-size 40px
        }
      }
      .purchase_nav_right {
        display: flex
        align-items center
        .icon-zuoyoujiantou {
          font-size 40px
          padding-bottom 6px
        }
      }
    }
    .cross_swiper {
      padding 15px 0 30px 0
      width: 100%
      overflow: hidden
      .swiper_box {
        display: flex
        align-items center
        .swiper_item {
          width: 220px
          border-radius 10px
          margin-right 14px
          overflow: hidden
          position: relative
          img {
            width: 100%
            height: 320px
            border-radius 10px
          }
          .score {
            font-size 24px
            color #ffffff
            background-color: #8AC91E
            border-radius 5px
            width 50px
            height: 50px
            line-height: 52px
            text-align: center
            position: absolute
            top: 270px
            right: 0
            z-index 100
          }
          .isNew {
            position: absolute
            top: 0
            left: 10px
            width: 45px
            height: 55px
            background-color: #F6A230
            color #ffffff
            font-size 18px
            text-align: center
            line-height: 55px
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
          }
          .movie_title {
            text-align: center
            margin 15px auto
            color #333
            font-size 28px
            no-wrap()
          }
          .ticket_btn {
            display: block
            width: 100px
            height: 50px
            border-radius 50px
            color #ffffff
            font-size 28px
            margin 0 auto
            line-height: 50px
            text-align: center
            background-image: -webkit-linear-gradient(0deg, #FFA042, #F1792F)
          }
        }
        .swiper_item:last-child {
          margin-right 0px !important
        }
      }

    }
  }
</style>
