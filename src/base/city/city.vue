<template>
  <scroll class="city"
          ref="city"
          :data="cityList"
          :probeType="probeType"
          @scroll="scroll"
          :listenScroll="listenScroll"
  >
    <div class="cityBox">
      <!--城市列表-->
      <div class="city_list" ref="city_list" v-for="item in cityList">
        <h2 class="city_title">{{item.title}}</h2>
        <div class="city_list_name">
          <span class="city_item" v-for="(name,index) in item.list" :key="index" @click="selectCity(name)">{{name.n}}</span>
        </div>
      </div>
    </div>
    <!--右边的城市字母列表-->
    <div class="letter_box" @touchstart="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchmove" v-show="letter">
      <span class="letter_item" v-for="(item,index) in LetterCity"
            :key="index"
            :data-index="index"
            :class="{'selectLetter':currentIndex === index}"
      >{{item}}</span>
    </div>
    <!--返回顶部-->
    <div class="toTop" @click="backtop" v-show="is_top">
      <i class="iconfont icon-fanhuidingbu"></i>
    </div>
    <!--加载动画-->
    <loading v-show="!cityList.length"></loading>
    <!--滚动固定标题的实现-->
    <div class="list-fixed" ref="fixedBox" v-show="fixedTitle">
      <h1 class="fixed-title" ref="colorTitle">{{fixedTitle}}</h1>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {mapMutations, mapGetters} from 'vuex'
  import {getCity} from 'api/mtime_data'
  import scroll from 'base/scroll/scroll'
  import {myDOM} from 'common/js/public_time'
  import loading from 'base/loading/loading'

  const TITLE_HEIGHT = 25      // 滚动规定的标题的高度
  const LETTER_HEIGHT = 40     // 右边栏每个字母的高度
  export default {
    props: {
      letter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        is_top: false,
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
        cityList: [],
        hotCity: {},
        LetterCity: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.cityHeight = []
      this.touch = {}
      this._getCity()
    },
    computed: {
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.LetterCity[this.currentIndex] ? this.LetterCity[this.currentIndex] : ''
      }
    },
    methods: {
      // 返回顶部
      backtop() {
        this.$refs.city.scrollTo(0, 0, 800)
      },
      ...mapMutations({
        cityData: 'SET_CITY_DATA',
        set_footer_talg: 'SET_FOOTER_TALG'
      }),
      // 派发选中城市的数据
      selectCity(city) {
        this.cityData(city)
        let talg = true
        this.set_footer_talg(talg)
        this.$router.push('/time')
      },
      // 获取城市列表的数据
      _getCity() {
        getCity().then((res) => {
          let city = res.data.p;
          this.handleCity(city);
        })
      },
      // 处理城市列表的数据
      handleCity(data) {
        let citys = {};
        for (let i = 0; i < this.LetterCity.length; i++) {
          citys[this.LetterCity[i]] = [];
        }
        data.forEach((item, idx) => {
          let letter = item.pinyinFull.slice(0, 1).toUpperCase();
          citys[letter].push(item);
        })
        for (let k in citys) {
          let item = {
            title: k,
            list: citys[k]
          }
          this.cityList.push(item);
        }
      },
      // 计算城市列表的高度
      caclHeight() {
        let height = 0;
        this.cityHeight = [];
        this.cityHeight.push(height)
        let list = this.$refs.city_list
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.cityHeight.push(height)
        }
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.city.refresh()
      },
      // 手指触摸屏幕时
      onShortcutTouchstart(e) {
        let newTouch = e.touches[0]
        this.touch.y1 = newTouch.pageY
        let nowIndex = myDOM.customAttribute(e.target, 'index')
        this.touch.nowIndex = nowIndex
        this._scrollTo(nowIndex)
      },
      // 滑动右侧，左侧联动，与左侧共享 touch 对象，手指在屏幕上滑动时
      onShortcutTouchmove(e) {
        let newTouch = e.touches[0]
        this.touch.y2 = newTouch.pageY
        // 两次touch y轴的偏移
        let offset = Math.floor((this.touch.y2 - this.touch.y1) / LETTER_HEIGHT)
        let nowIndex = Number(this.touch.nowIndex) + offset
        this._scrollTo(nowIndex)
      },
      _scrollTo(index) {
        if (!index) {
          return
        }
        if (index < 0) {
          index = 0
        }
        else if (index > this.cityHeight.length - 2) {
          index = this.cityHeight.length - 2
        }
        this.currentIndex = Number(index)
        this.$refs.city.scrollToElement(this.$refs.city_list[index], 0)
      }
    },
    watch: {
      cityList() {
        setTimeout(() => {
          this.caclHeight();
        }, 20)
      },
      // 监听 scrollY 落在 cityHeight 的哪个区间，实现高亮联动
      scrollY(newY) {
        const cityHeight = this.cityHeight
        // 当滚动到顶部时，newY>0
        if (newY >= 0) {
          this.currentIndex = 0
          this.is_top = false
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < cityHeight.length - 1; i++) {
          let height1 = cityHeight[i]
          let height2 = cityHeight[i + 1]
          if (-newY > height1 && -newY < height2) {    // 因为是向下滑动所以newY是负值
            this.currentIndex = i
            this.diff = Math.floor(height2 + newY)               // 两个字母标题栏之间的距离
            if (-newY > cityHeight[1]) {
              this.is_top = true
            }
            return
          }
        }
        // 当滚到底部，且-newY大于最后一个元素的上限
        this.currentIndex = cityHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixedBox.style.transform = `translate3d(0,${fixedTop}px,0)`
        // this.$refs.colorTitle.style.color = '#FFCD32'
      }
    },
    components: {
      scroll,
      loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .city {
    background-color: #fff
    position: fixed
    top: 185px
    bottom: 0
    width: 100%
    overflow: hidden
    .city_title {
      padding-left 20px
      display: flex
      align-items center
      height: 50px
      color #000
      font-size 30px
      background-color: #D6DBD9
    }
    .cityBox {
      position: relative
      .city_list {
        .city_list_name {
          display: flex
          justify-content flex-start
          flex-wrap wrap
          align-items center
          padding 0 60px 0 35px
          .city_item {
            display: block
            width: 100%;
            color #333
            font-size 30px
            padding 20px 0 20px 15px
            border-bottom-1px(#D6D6D6)
          }
        }
      }
    }
    .letter_box {
      background-color: #EEF3F2
      width: 35px
      padding 20px 0px
      position: fixed
      right 0px
      top: 50%
      transform translateY(-42%)
      border-radius 40px
      z-index 100
      .letter_item {
        width: 100%
        height: 40px
        line-height: 40px
        display: block
        text-align: center
        font-size 25px
        color #666
      }
      .selectLetter {
        color #F97F41
      }
    }
    .list-fixed {
      position: absolute
      top: -2px
      left: 0
      width: 100%
      .fixed-title {
        padding-left 20px
        display: flex
        align-items center
        height: 50px
        color #000
        font-size 30px
        background-color: #D6DBD9
      }
    }
    .toTop {
      position: fixed
      bottom 80px
      right 50px
      z-index: 500
      .iconfont {
        font-size 80px
        color #F9A340
      }
    }
  }
</style>
