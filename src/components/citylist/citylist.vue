<template>
  <div class="citylist_box">
    <div class="citylist_box_nav">
      选择城市
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
    </div>
    <search></search>
    <div class="city">
      <div class="current_city">
        <span>当前城市</span>
        <span class="current_city_txt">{{current_city}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations, mapGetters} from 'vuex'
  import search from 'base/search/searchBox'
  import {getCity} from 'api/selling_tickets'

  export default {
    data() {
      return {}
    },
    created() {
      this._getCity();
    },
    computed: {
      ...mapGetters({
        current_city: 'cityName'
      })
    },
    methods: {
      ...mapMutations({
        set_footer_talg: 'SET_FOOTER_TALG'
      }),
      // 返回按钮
      back() {
        let talg = true;
        this.set_footer_talg(talg);
        this.$router.back(-1);
      },
      // 获取城市列表的数据
      _getCity() {
        getCity().then((res) => {
          console.log(res);
          let city = res.data.p;
          this.handleCity(city);
        })
      },
      handleCity(data) {
        let citys = {};
        let LetterCity = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let i = 0; i < LetterCity.length; i++) {
          citys[LetterCity[i]] = [];
        }
        data.forEach((item, idx) => {
          let letter = item.pinyinFull.slice(0, 1).toUpperCase();
          citys[letter].push(item);
        })
        console.log(citys);
      }
    },
    components: {
      search
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .citylist_box {
    background-color: #F4F9F7
    .citylist_box_nav {
      position: relative
      text-align: center
      color #ffffff
      font-size 35px
      height: 85px
      line-height: 85px
      background-color: #202534
      .back {
        position: absolute
        left: 20px
        top: 50%
        transform translateY(-50%)
        .icon-zuoyoujiantou1 {
          font-size 50px
        }
      }
    }
    .city {
      padding 0 25px
      background-color: #fff
      .current_city {
        padding 25px 0 25px 10px
        color #787878
        font-size 30px
        border-bottom-1px(#D9D9D9)
        .current_city_txt {
          color #333
          margin-left 20px
        }
      }
    }
  }
</style>
