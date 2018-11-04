<template>
  <animation>
    <div class="citylist_box">
      <div class="citylist_box_nav">
        选择城市
        <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
      </div>
      <search @talg="talgBtn" @set_keyword="set_keyword"></search>
      <city :letter="talg_letter" :cityWord="cityWord"></city>
    </div>
  </animation>
</template>

<script type="text/ecmascript-6">
  import search from 'base/search/searchBox'
  import city from 'base/city/city'
  import animation from 'base/returnAnimation/returnAnimation'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        talg_letter: true,
        cityWord: ''
      }
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
      talgBtn(talg) {
        this.talg_letter = talg
      },
      // 搜索城市名称
      set_keyword(word) {
        this.cityWord = word
      }
    },
    components: {
      search,
      city,
      animation
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .citylist_box {
    background-color: #F4F9F7
    z-index 9000
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
  }
</style>
