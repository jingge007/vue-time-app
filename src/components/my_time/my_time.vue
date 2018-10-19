<template>
  <div class="my_time">
    <div class="my_time_header">
      <div class="my_time_content">
        <div class="my_header">
          <i class="iconfont icon-icontouxiang"></i>
        </div>
        <div class="my_time_botton">
          <p class="login botton" @click="loginBtn">登录</p>
          <p class="register botton">注册</p>
        </div>
      </div>
    </div>
    <div class="my_time_nav">
      <div class="nav_item">
        <span class="nav_number">0</span>
        <span class="nav_text">影评</span>
        <span class="nav_line"></span>
      </div>
      <div class="nav_item">
        <span class="nav_number">0</span>
        <span class="nav_text">电影</span>
        <span class="nav_line"></span>
      </div>
      <div class="nav_item">
        <span class="nav_number">0</span>
        <span class="nav_text">关注</span>
        <span class="nav_line"></span>
      </div>
      <div class="nav_item">
        <span class="nav_number">0</span>
        <span class="nav_text">历史</span>
        <span class="nav_line"></span>
      </div>
      <div class="nav_item">
        <span class="nav_number">0</span>
        <span class="nav_text">收藏</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    methods: {
      // 登录按钮
      loginBtn() {
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .my_time {
    height 100vh
    width: 100%
    background-color: #F2F2F2
    .my_time_header {
      height: 250px
      background-color: #1D2634
      display: flex
      align-items center
      .my_time_content {
        padding-left 40px
        display: flex
        align-items center
        .my_header {
          width: 130px
          height: 130px
          border-radius 100%
          display: flex
          align-items center
          justify-content center
          background-color: #fff
          .iconfont {
            font-size 70px
            color #DDDDDD
          }
        }
        .my_time_botton {
          margin-left 40px
          display: flex
          align-items center
          .botton {
            display: flex
            align-items center
            justify-content center
            width: 120px
            height: 55px
            border-radius 55px
            text-align: center
            font-size 25px
          }
          .login {
            border 1px solid #EE8527
            color #EE8527
          }
          .register {
            margin-left 30px
            border 1px solid #868D93
            color #868D93
          }
        }
      }
    }
    .my_time_nav {
      background-color: #fff
      height: 110px
      display: flex
      align-items center
      .nav_item {
        position: relative
        flex 1
        display: flex
        flex-direction column
        align-items center
        justify-content center
        .nav_number {
          margin-bottom 5px
          font-size 35px
          font-weight 500
          color #333
        }
        .nav_text {
          font-size 25px
          color #A3A3A3
        }
        .nav_line {
          background-color: #D6D6D6
          width: 2px
          height: 50%
          display: block
          position: absolute
          right 0
          top 50%
          transform translateY(-50%)
        }
      }
    }
  }
</style>
