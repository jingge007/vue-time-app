<template>
  <div class="time_index">
    <!--轮播图-->
    <swiper-box></swiper-box>
    <div class="time_content">
      <!--热映购票-->
      <div class="purchase_nav">
        <div class="purchase_nav_left">
          <span class="txt">热映购票·</span>
          <span @click="getCity">{{cityName}}</span>
          <i class="iconfont icon-down_arrow"></i>
        </div>
        <div class="purchase_nav_right">
          <span>31部</span>
          <i class="iconfont icon-zuoyoujiantou"></i>
        </div>
      </div>
      <ul class="cross_swiper">
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiperBox from 'base/swiper/swiper'
  import getCityName from 'common/js/getUserLocation'
  import {getTickets, getIndex} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        ticketsData: [],
        city_id: null,
        cityName: ''
      }
    },
    mounted() {
      this._getCityName()
    },
    created() {
      this._getTickets();
      this._getIndex();
    },
    computed: {
      ...mapGetters({
        cityData: 'cityData'
      })
    },
    methods: {
      // 获取热映购票的数据
      _getTickets() {
        // 当前的城市
        if (this.cityName == '深圳') {
          this.city_id = 366;
        }
        getTickets(this.city_id).then((res) => {
          if (res.status == STATUS) {
            this.ticketsData = res.data.movies;
          }
        })
      },
      // 获取首页的数据
      _getIndex() {
        getIndex().then((res) => {
          // console.log(res);
        })
      },
      ...mapMutations({
        set_footer_talg: 'SET_FOOTER_TALG'
      }),
      // 获取当前的城市
      _getCityName() {
        if (Object.keys(this.cityData).length != 0) {
          this.cityName = this.cityData.n
        } else {
          getCityName().then((city) => {
            this.cityName = city.slice(0, 2);
          })
        }
      },
      // 点击进入选择城市列表页
      getCity() {
        this.$router.push('/citylist');
        let talg = false;
        this.set_footer_talg(talg);
      }
    },
    watch: {
      ticketsData() {
        console.log(this.ticketsData);
      }
    },
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
    .time_content {
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
          }
        }
      }
    }
  }
</style>
