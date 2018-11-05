<template>
  <div class="footer_tab" v-show="footer_talg">
    <router-link tag="div" class="footer_tab_item" to="/time">
      <i class="iconfont icon-yemian iconfont_item"></i>
      <span class="tab_txt">首页</span>
    </router-link>
    <router-link tag="div" class="footer_tab_item" to="/ticket">
      <i class="iconfont icon-goupiao iconfont_item"></i>
      <span class="tab_txt">购票</span>
    </router-link>
    <router-link tag="div" class="footer_tab_item" to="/time_film">
      <i class="iconfont icon-guanjun iconfont_item"></i>
      <span class="tab_txt">时光猜电影</span>
    </router-link>
    <router-link tag="div" class="footer_tab_item" to="/video">
      <i class="iconfont icon-shipin iconfont_item"></i>
      <span class="tab_txt">视频</span>
    </router-link>
    <router-link tag="div" class="footer_tab_item" to="/my_time">
      <i class="iconfont icon-wodedangxuan iconfont_item"></i>
      <span class="tab_txt">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['footer_talg'])
    },
    methods: {
      ...mapMutations({
        set_footer_talg: 'SET_FOOTER_TALG'
      })
    },
    created() {

    },
    watch: {
      '$route'(to, from) {
        let talg = '';
        if (to.meta.requireAuth_talg) {
          talg = false;
          this.set_footer_talg(talg);
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .footer_tab {
    border-top-1px(#666)
    width: 100%
    display: flex
    justify-content: space-around
    align-items center
    position: fixed
    bottom: 0
    left: 0
    z-index 9999
    font-size 28px
    color #666
    background-color: #fff
    .router-link-active {
      color #F97F41 !important
      .iconfont_item {
        color #F97F41 !important
      }
    }
    .footer_tab_item {
      margin-top 15px
      display: flex
      flex-direction column
      align-items center
      .iconfont_item {
        font-size 40px
        color #666
      }
      .tab_txt {
        display: inline-block
        margin 5px 0 10px 0
      }
    }
  }
</style>
