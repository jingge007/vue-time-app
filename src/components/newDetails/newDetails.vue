<template>
  <div class="new_details">
    <!--头部区域-->
    <div class="citylist_box_nav">
      <span>新闻详情</span>
      <span class="back" @click="back">
          <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
      <span class="toTop" @click="backtop">
        <i class="iconfont icon-fanhuidingbu"></i>
      </span>
    </div>
    <scroll class="list_scroll"
            ref="news"
            :data="newsData"
            v-show="!loading_talg"
    >
      <div>
        <!--新闻内容-->
        <h2 class="new_title">{{newsData.title}}</h2>
        <div class="title_nav">
          <span>{{newsData.source}}</span>
          <span class="timer">{{nowTime}}</span>
        </div>
        <div class="images_box" v-show="imgData.length>3">
          <scroll class="img_box"
                  :data="imgData"
                  :scrollX="this.scrollX"
                  :eventPassthrough="this.eventPassthrough"
          >
            <div class="img_list" ref="img_box">
              <img :src="item.image" v-for="(item,index) in imgData" alt="" :key="index" class="img_item">
            </div>
          </scroll>
          <div class="img_num">
            <span>图集</span>
            <span>{{'共'+imgData.length+'张'}}</span>
          </div>
        </div>
        <div class="news_content" v-html="newsData.content" @click="imgBtn($event)" ref="imgItem"></div>
      </div>
    </scroll>
    <!--加载动画-->
    <loading v-show="loading_talg"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getNewDetail} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import {timer} from 'common/js/public_time'
  import loading from 'base/loading/loading'
  import scroll from 'base/scroll/scroll'
  import {images} from 'common/js/public_time'

  export default {
    data() {
      return {
        newsData: {},
        nowTime: '',
        loading_talg: true,
        eventPassthrough: 'vertical',           // 忽略better-scroll垂直滚动的方向
        scrollX: true,
        imgData: []
      }
    },
    created() {
      this._getNewDetail()
    },
    methods: {
      // 返回按钮
      back() {
        this.$router.back(-1);
      },
      // 获取新闻详情的数据
      _getNewDetail() {
        let newsId = this.$route.params.id
        getNewDetail(newsId).then((res) => {
          if (res.status == STATUS) {
            this.newsData = res.data;
            this.handleImg(res.data.content)
            console.log(images.getimgsrc(res.data.content))
            if (res.data.relations) {
              this.imgData = res.data.relations
            }
            this.handleTime(res.data.time)
            this.loading_talg = false;
          } else {
            this.loading_talg = true;
          }
        })
      },
      // 处理时间格式的问题
      handleTime(data) {
        let time = new Date(data);
        let date = Date.parse(time)
        this.nowTime = timer.dateDiff(date);
      },
      // 处理文章的img图片问题
      handleImg(data) {
        console.log(data)
        let imgReg = /<img.*?(?:>|\/>)/gi;
        let talg = data.match(imgReg)
        for (let i = 0; i < talg.length; i++) {
          console.log(talg[i])
        }
        // console.log(this.$refs.imgItem.img)
        //  console.log(talg)
      },
      // 返回顶部
      backtop() {
        this.$refs.news.scrollTo(0, 0, 800)
      },
      //
      imgBtn(e) {
        console.log(e.target)
       // console.log(e.target.setAttribute("data-index", 2))
        // if (e.target == 'img') {
        //   console.log('我点击的是图片');
        // } else {
        //   console.log('我点击的不是图片');
        // }
      }
    },
    watch: {
      // scroll组件计算高度，确保正确滚动
      newsData() {
        setTimeout(() => {
          // 计算左右滑动模块的宽度
          let picWidth = 125
          let margin = 7
          let width = (picWidth + margin) * this.imgData.length - margin
          this.$refs.img_box.style.width = width + 'px'
          this.$refs.news.refresh()
        }, 20)
      }
    },
    components: {
      loading,
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .new_details {
    background-color: #fff
    width: 100%
    height: 100%

    .citylist_box_nav {
      width: 100%
      z-index: 1000
      text-align: center
      color #ffffff
      font-size 35px
      height: 85px
      line-height: 85px
      background-color: #202534
      position: relative

      .back {
        position: absolute
        left: 20px
        top: 50%
        transform translateY(-45%)

        .icon-zuoyoujiantou1 {
          font-size 50px
        }
      }

      .toTop {
        position: absolute
        right: 20px
        top: 50%
        transform translateY(-45%)

        .icon-fanhuidingbu {
          font-size 50px
          color #FF8703
        }
      }
    }

    .list_scroll {
      position: absolute
      top: 85px
      left: 0px
      right: 0
      bottom: 20px
      padding 0 25px
      overflow: hidden

      .images_box {
        .img_box {
          width: 100%
          overflow: hidden

          .img_list {
            display: flex
            align-items center

            .img_item {
              width: 250px
              height: 300px
              display: inline-block
              margin-right 14px
            }

            .img_item:last-child {
              margin-right 0px
            }
          }
        }

        .img_num {
          display: flex
          justify-content center
          align-items center
          padding 15px 0 30px 0
          font-size 30px
          color #B3B3B3

          span:nth-child(1) {
            margin-right 15px
          }
        }
      }

      .new_title {
        padding 25px 0 10px 0
        color #000
        font-size 40px
      }

      .title_nav {
        display: flex
        align-items center
        padding 5px 0 20px 0
        font-size 25px
        color #C0BFBF

        .timer {
          margin-left 30px
        }
      }

      .news_content {
        color #666
        font-size 30px

        /deep/ img, /deep/ video {
          border none
          width: 100%
          height: auto
        }

        /deep/ div {
          line-height 50px
        }
      }
    }
  }
</style>
