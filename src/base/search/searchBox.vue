<template>
  <div class="search_box">
    <input type="text" class="search_input" :placeholder='placeholder' @focus="focusBtn" @blur="blurBtn">
    <i class="iconfont icon-sousuo"></i>
    <span class="search_txt" v-text="searchBtn"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入城市名'
      },
      searchBtn: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        talg: true
      }
    },
    methods: {
      // 获取焦点
      focusBtn() {
        this.talg = false
        this.$emit('talg', this.talg)
      },
      // 失去焦点
      blurBtn() {
        this.talg = true
        this.$emit('talg', this.talg)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .search_box {
    padding 15px 30px
    display: flex
    align-items center
    position: relative
    .search_input {
      background-color: #fff
      height: 70px
      line-height: 70px
      border 1px solid #BDBDBD
      border-radius 10px
      outline none
      padding-left 70px
      color #333
      font-size 32px
      flex 1
      ::-webkit-input-placeholder {
        color: #969696
      }
      :-moz-placeholder {
        color: #969696
      }
      :-ms-input-placeholder {
        color: #969696
      }
      ::-moz-placeholder {
        color: #969696
      }
    }
    .icon-sousuo {
      font-size 40px
      position: absolute
      top: 50%
      left: 45px
      transform translateY(-50%)
      color #BEBEBE
    }
    .search_txt {
      margin-left 20px
      font-size 32px
      color: #969696
    }
  }
</style>
