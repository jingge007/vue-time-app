<template>
  <div class="login_box">
    <div class="login_nav">
        <span class="login_back" @click="talgBack">
          <i class="iconfont icon-zuoyoujiantou1"></i>
        </span>
      <i class="iconfont icon-shiguangwang"></i>
    </div>
    <div class="login_from">
      <div class="login_item">
        <i class="iconfont icon-zhanghao"></i>
        <input class="login_input" type="text" placeholder='登录邮箱/手机号码'>
        <span class="line_item"></span>
      </div>
      <div class="login_item">
        <i class="iconfont icon-mima"></i>
        <input class="login_input" type="password" placeholder='输入登录密码'>
      </div>
    </div>
    <button type="button" class="login_botton">登录</button>
    <div class="register_box">
      <span class="register_txt">免费注册</span>
      <span>找回密码</span>
    </div>
    <div class="third_party_login">
      <span class="line_login"></span>
      <span class="line_login_title">第三方账号登录</span>
      <span class="line_login"></span>
    </div>
    <div class="third_party_icon">
      <i class="iconfont icon-weibo"></i>
      <i class="iconfont icon-QQdenglu1"></i>
      <i class="iconfont icon-weixin"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    methods: {
      ...mapMutations({
        set_footer_talg: 'SET_FOOTER_TALG'
      }),
      // 返回按钮
      talgBack() {
        let talg = true;
        this.set_footer_talg(talg);
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .login_box {
    width: 100%
    min-height: 100vh
    overflow: hidden
    background-color: #EBEBEB
    .login_nav {
      height: 85px
      line-height: 85px
      text-align: center
      background-color: #1E2536
      position: relative
      .login_back {
        position: absolute
        top: 0
        left: 10px
        .icon-zuoyoujiantou1 {
          font-size 60px
          color #fff
        }
      }
      .icon-shiguangwang {
        font-size 120px
        color: #fff
      }
    }
    .login_from {
      background-color: #fff
      margin 60px 0 40px 0
      .login_item {
        height: 90px
        line-height: 90px
        display: flex
        align-items center
        position: relative
        .iconfont {
          width: 100px;
          font-size 45px
          text-align center

        }
        .login_input {
          flex 1
          font-size 30px
          color #666
          height: 90px
          line-height: 90px
          border none
          outline none
        }
        .login_input::-webkit-input-placeholder {
          color: #DEDEDE;
          font-size 30px
        }
        .login_input:-moz-placeholder {
          color: #DEDEDE;
          font-size 30px
        }
        .login_input:-ms-placeholder {
          color: #DEDEDE;
          font-size 30px
        }
        .login_input:-o-placeholder {
          color: #DEDEDE;
          font-size 30px
        }

        .login_input:placeholder {
          color: #DEDEDE;
          font-size 30px
        }
        .line_item {
          width: 87%
          display: inline-block
          height 2px
          background-color: #EBEBEB
          position: absolute
          bottom 0
          right: 0
          z-index 9999
        }
      }
    }
    .login_botton {
      display: block
      margin 0 auto;
      width: 90%
      height: 80px
      line-height: 80px
      text-align: center
      color #ffffff
      font-size 35px
      border-radius 80px
      background-color: #0076C5
      outline none
      border: none
    }
    .register_box {
      margin: 40px auto 60px
      padding 0 80px
      font-size 28px
      color #828282
      display: flex
      align-items center
      justify-content space-between
      .register_txt {
        color #1483AA
      }
    }
    .third_party_login {
      padding 0 30px
      display: flex
      align-items center
      justify-content space-between
      .line_login {
        display: inline-block
        flex 1
        height: 2px
        background-color: #D9DAD5
      }
      .line_login_title {
        display: inline-block
        font-size 28px
        color #A4A4A4
        margin 0 15px
      }
    }
    .third_party_icon {
      width: 60%
      margin 0 auto
      margin-top 45px
      display: flex
      justify-content: space-around
      align-items center
      .iconfont {
        font-size 100px
      }
      .icon-weibo {
        color #E83E33 !important
      }
      .icon-QQdenglu1 {
        color #57C3FF !important
      }
      .icon-weixin {
        color #0AB15D !important
      }
    }
  }
</style>
