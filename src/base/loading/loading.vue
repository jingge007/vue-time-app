<template>
  <!--全面屏时加载的动画-->
  <div class="loading" ref="loading_height">
    <img src="../../assets/loading.gif" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        clientHeight: '',
      }
    },
    mounted() {
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`

    },
    methods: {
      changeFixed(clientHeight) {
        this.$refs.loading_height.style.height = clientHeight + 'px';
      }
    },
    watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .loading {
    position: absolute
    left: 0
    top: 0
    width: 100%
    background-color: #fff
    z-index 1000
    img {
      position: absolute
      top: 42%
      left: 50%
      transform translate(-50%, -50%)
      width: 200px
      height: 200px
      display: block
    }
  }
</style>


