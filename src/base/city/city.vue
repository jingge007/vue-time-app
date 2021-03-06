<template>
  <div>
    <scroll class="city"
            ref="city"
            :data="cityList"
            :probeType="probeType"
            @scroll="scroll"
            :listenScroll="listenScroll"
            v-show="talg_city"
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
      <!--加载动画-->
      <loading v-show="!cityList.length" :fullScreen="fullScreen"></loading>
      <!--滚动固定标题的实现-->
      <div class="list-fixed" ref="fixedBox" v-show="fixedTitle">
        <h1 class="fixed-title" ref="colorTitle">{{fixedTitle}}</h1>
      </div>
    </scroll>
    <scroll class="search_city"
            :data="search_city"
            v-show="!talg_city"
    >
      <div class="search_city_box">
        <span class="search_city_item" v-for="(name,index) in filtereCity" :key="index" @click="selectCity(name)">{{name.n}}</span>
        <div v-show="is_talg_city" class="is_city">当前搜索无此城市</div>
      </div>
    </scroll>
  </div>
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
      },
      cityWord: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        fullScreen: true,
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
        cityList: [],
        search_city: [],
        hotCity: {},
        talg_city: true,
        is_talg_city: false,
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
      },
      // 搜索城市名称
      filtereCity() {
        return this.search_city.filter(post => {
          return post.n.toLowerCase().includes(this.cityWord.toLowerCase())
        })
      },
    },
    methods: {
      ...mapMutations({
        cityData: 'SET_CITY_DATA'
      }),
      // 派发选中城市的数据
      selectCity(city) {
        this.cityData(city)
        this.$router.push('/time')
      },
      // 获取城市列表的数据
      _getCity() {
        getCity().then((res) => {
          let city = res.data.p;
          this.handleCity(city);
          this.search_city = city;
        })
      },
      // 处理城市列表的数据
      handleCity(data) {
        if (data) {
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
        } else if (index > this.cityHeight.length - 2) {
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
      cityWord() {
        if (this.cityWord != '') {
          this.talg_city = false;
        } else {
          this.talg_city = true;
        }
      },
      filtereCity() {
        if (this.filtereCity.length > 0) {
          this.is_talg_city = false;
        } else {
          this.is_talg_city = true;
        }
      },
      // 监听 scrollY 落在 cityHeight 的哪个区间，实现高亮联动
      scrollY(newY) {
        const cityHeight = this.cityHeight
        // 当滚动到顶部时，newY>0
        if (newY >= 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < cityHeight.length - 1; i++) {
          let height1 = cityHeight[i]
          let height2 = cityHeight[i + 1]
          if (-newY > height1 && -newY < height2) {    // 因为是向下滑动所以newY是负值
            this.currentIndex = i
            this.diff = Math.floor(height2 + newY)               // 两个字母标题栏之间的距离
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
  .city, .search_city {
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

    .search_city_box {
      width: 100%;
      color #333
      font-size 30px

      .search_city_item {
        display: block
        padding 20px 0 20px 40px
        border-bottom-1px(#D6D6D6)
      }

      .is_city {
        text-align center
        padding-top 20px
      }
    }
  }
</style>
