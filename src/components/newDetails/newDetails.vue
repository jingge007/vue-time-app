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
        <div class="img_list" v-show="imgData.length>0">
          <img :src="img_big" alt="" class="imgBig">
          <div class="img_box">
            <span>
              <i class="iconfont icon-tupian"></i>
            </span>
            <span class="text">{{imgData.length+'图'}}</span>
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
  import {ImagePreview} from 'vant'

  export default {
    data() {
      return {
        newsData: {},
        nowTime: '',
        loading_talg: true,
        imgData: [],
        imgList: [],
        img_big: ''
      }
    },
    created() {
      this._getNewDetail()
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.news.refresh();
      })
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
            this.imgList = images.getimgsrc(res.data.content);
            if (res.data.images) {
              this.imgData = res.data.images
              this.img_big = this.imgData.slice(0, 1)[0].url1;

              this.imgData.forEach((item, index) => {
                item['src'] = item.url1;
              })
              console.log(this.imgData)
            }
            this.handleTime(res.data.time)
            this.loading_talg = false;
            this.$refs.news.refresh();
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
      // 返回顶部
      backtop() {
        this.$refs.news.scrollTo(0, 0, 500)
      },
      // 点击图片预览图片
      imgBtn(e) {
        let img_arr = [];
        let currentIndex = 0;
        let talg_src = e.target.getAttribute("src");
        if (talg_src != null && talg_src.slice(-3) == 'jpg') {
          this.imgList.forEach((item, idx) => {
            img_arr.push(item.src)
            if (item.src == talg_src) {
              currentIndex = item.id;
            }
          })
          ImagePreview({
            images: img_arr,
            startPosition: currentIndex,
            // showIndicators: true
          });
        }
      },

    },
    watch: {
      // scroll组件计算高度，确保正确滚动
      newsData() {
        this.$nextTick(() => {
          this.$refs.news.refresh();
        })
      }
    },
    components: {
      loading,
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .preview-img {
    display: none
  }

  .view_img {
    display: block !important
  }

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

      .img_list {
        width: 100%
        margin 0 auto 30px
        position: relative

        .imgBig {
          width: 100%
          height: auto
        }

        .img_box {
          padding 4px 15px
          position: absolute
          bottom 15px
          right 10px
          border-radius 40px
          background-color: rgba(4, 4, 4, .65)

          span {
            display: inline-block
            color #fff
            font-size 24px

            .icon-tupian {
              font-size 26px
              color #fff
            }
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
