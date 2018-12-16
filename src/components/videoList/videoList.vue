<template>
  <div class="video_list">
    <!--头部标题-->
    <div class="video_title">
      {{video_title}}
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
    </div>
    <!--头部导航栏区域-->
    <div class="video_nav">
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in video_nav" :title="item.name" :key="index">
          <div class="video_conter">
            <div class="video_box" v-for="talg in videoList">
              <h2 class="title">{{talg.title}}</h2>
              <div class="play">
                <img :src="talg.image" alt="" class="video_img">
                <span class="play_icon">
                <i class="iconfont icon-bofangshipin"></i>
              </span>
              </div>
              <div class="operation_box">
                <span class="play_num">{{talg.playCount+'次播放'}}</span>
                <span class="comment_number"></span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getVideoList} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        active: 0,
        video_title: '',
        video_nav: [],
        videoList: [],
      }
    },
    created() {
      this._getVideoList();
    },
    methods: {
      // 返回按钮
      back() {
        this.$router.back(-1);
      },
      // 获取视频列表的数据
      _getVideoList() {
        let type = -1;
        let page = 1;
        let movie_id = this.$route.params.id;
        getVideoList(movie_id, page, type).then((res) => {
          if (res.status == STATUS) {
            this.video_title = res.data.data.movieTitle;
            this.video_nav = res.data.data.category;
            this.videoList = res.data.data.videoList;
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .video_list {
    width: 100%
    background-color: #1D2634

    .video_title {
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

    .video_nav /deep/ {
      .van-tabs__nav {
        .van-tab {
          font-size 28px
          color #9FA6AB
          background-color: #1D2634
        }

        .van-tabs__line {
          background-color: #FC8509
          height: 5px
        }

        .van-tab--active {
          color #fff
        }
      }

      [class*=van-hairline]::after {
        border none
      }

      .video_conter {
        padding 0 25px
        background-color: #fff

        .video_box {
          padding 25px 0 20px 0
          border-bottom-1px(#d6d6d6)

          .play {
            position: relative

            .play_icon {
              position: absolute
              top: 50%
              left: 50%
              transform translate(-50%, -50%)

              .iconfont {
                font-size 135px
                color #fff
              }
            }

            .video_img {
              width: 100%
              height: auto
              display: block
            }
          }


          .title {
            margin-bottom 15px
            font-size 30px
            color #333
            no-wrap()
          }

          .operation_box {
            margin-top 20px
            display: flex

            .play_num {
              color #9F9F9F
              font-size 23px
            }
          }
        }
      }
    }
  }
</style>
