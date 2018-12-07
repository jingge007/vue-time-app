<template>
  <div class="comment_box">
    <div class="purchase_nav">
      <div class="purchase_nav_left">短评</div>
      <div class="purchase_nav_right">
        <span>全部</span>
        <i class="iconfont icon-zuoyoujiantou"></i>
      </div>
    </div>
    <div class="comment_list" v-show="commentData.length>0" v-for="item in commentData">
      <img :src="item.caimg" alt="" class="header_icon">
      <div class="comment_item">
        <h2 class="title">
          <span class="text">{{item.ca}}</span>
          <span class="score" v-show="item.cr>0">{{'评'+item.score}}</span>
        </h2>
        <div class="conter">{{item.ce}}</div>
        <div class="comment_footer">
          <span class="timer">{{item.timer}}</span>
          <div class="operation_box">
            <i class="iconfont icon-huifu"></i>
            <span class="txt">回复</span>
            <i class="iconfont icon-unie60b"></i>
            <span class="txt">点赞</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getMovieComment} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import {timer} from 'common/js/public_time'

  export default {
    props: {
      movie_id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        commentData: []
      }
    },
    created() {
      this._getMovieComment();
    },
    methods: {
      // 获取电影短评的数据
      _getMovieComment() {
        let movie_id = this.movie_id;
        let page = 1;
        getMovieComment(movie_id, page).then((res) => {
          if (res.status == STATUS) {
            this.timeStamp(res.data.cts);
          }
        })
      },
      // 对电影短评的数据
      timeStamp(data) {
        data.forEach((item, idx) => {
          // 评论的时间
          if (item.cd) {
            item['timer'] = timer.dateDiff(item.cd)
          }
          // 评分
          let score = item.cr;
          if (score) {
            let len = score.toString().length
            if (len < 2) {
              item['score'] = score + '.0';
            } else {
              item['score'] = score
            }

          }
        })
        this.commentData = data.slice(0, 2);
        console.log(this.commentData)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .comment_box {
    padding 25px 20px
    margin 25px 0
    background-color: #fff
    .purchase_nav {
      display: flex
      align-items center
      justify-content space-between
      font-size 32px
      .purchase_nav_left {
        color #333
      }
      .purchase_nav_right {
        display: flex
        align-items center
        color #9CA19F
        .icon-zuoyoujiantou {
          font-size 40px
          padding-bottom 6px
          color #9CA19F
        }
      }
    }
    .comment_list {
      width: 100%
      display: flex
      margin-top 25px
      border-bottom-1px(#D2D7D5)
      .header_icon {
        width: 100px
        height: 100px
        border-radius 50%
        overflow: hidden
        margin-right 20px
      }

      .comment_item {
        flex 1
        .title {
          display: flex
          justify-content space-between
          align-items center
          margin-bottom 15px
          font-size 28px
          .text {
            color #9E9E9E
          }
          .score {
            color #A0BA46
            margin-right 20px
          }
        }
        .conter {
          font-size 28px
          color #333
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .comment_footer {
          display: flex
          justify-content space-between
          font-size 26px
          padding 20px 30px 25px 0
          .timer {
            color #9E9E9E
          }
          .operation_box {
            display: flex
            align-items center
            color #9B9B9B
            .txt {
              margin-left 12px
            }
            .iconfont {
              color #9B9B9B
              font-size 35px
            }
            .icon-unie60b {
              margin-left 35px
              font-size 30px
            }
            .icon-huifu {
              position: relative
              top 7px
            }
          }
        }
      }
    }
  }
</style>
