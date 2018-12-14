<template>
  <div>
    <!--短评-->
    <div class="comment_box" v-show="commentData.length>0">
      <div class="purchase_nav">
        <div class="purchase_nav_left">短评</div>
        <div class="purchase_nav_right">
          <span>全部</span>
          <i class="iconfont icon-zuoyoujiantou"></i>
        </div>
      </div>
      <div class="comment_list" v-for="item in commentData">
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
      <div class="total_box">{{'查看更多'+commentTotal+'条评论'}}</div>
    </div>
    <!--影评-->
    <div class="film_review_box" v-show="reviewData.length>0">
      <div class="purchase_nav">
        <div class="purchase_nav_left">影评</div>
        <div class="purchase_nav_right">
          <span>全部</span>
          <i class="iconfont icon-zuoyoujiantou"></i>
        </div>
      </div>
      <div class="review" v-for="item in reviewData">
        <div class="film_box">
          <img :src="item.headurl" alt="" class="icon_header">
          <span class="name">{{item.nickname}}</span>
          <span class="score">{{'评'+item.score+'分'}}</span>
          <span class="line"></span>
          <span class="comment_num">{{item.commentCount+'评论'}}</span>
        </div>
        <h2 class="title">{{item.title}}</h2>
      </div>
      <div class="total_box">{{'查看更多'+reviewTotal+'条影评'}}</div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import {getMovieComment, getMovieReview} from 'api/mtime_data'
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
        commentData: [],
        reviewData: [],
        commentTotal: '',
        reviewTotal: ''
      }
    },
    created() {
      this._getMovieComment();
      this._getMovieReview();
    },
    methods: {
      // 获取电影短评的数据
      _getMovieComment() {
        let movie_id = this.movie_id;
        let page = 1;
        getMovieComment(movie_id, page).then((res) => {
          if (res.status == STATUS) {
            this.timeStamp(res.data.cts);
            this.commentTotal = res.data.totalCommentCount;
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
      },
      // 获取电影影评的数据
      _getMovieReview() {
        let movie_id = this.movie_id;
        getMovieReview(movie_id).then((res) => {
          if (res.status == STATUS) {
            let data = res.data.comments.slice(0, 2);
            this.reviewTotal = res.data.totalCount;
            data.forEach((item, idx) => {
              let score = item.rating;
              let len = score.toString().length
              if (len < 2) {
                item['score'] = score + '.0';
              } else {
                item['score'] = score
              }
            })
            this.reviewData = data;
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
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

  .comment_box {
    padding 25px 20px 0 20px
    margin 25px 0
    background-color: #fff
    .comment_list {
      width: 100%
      display: flex
      margin-top 25px
      border-bottom 1px solid #D2D7D5
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
    .total_box {
      padding 25px 0
      display: flex
      justify-content center
      align-items center
      font-size 28px
      color #FF8703
    }
  }

  .film_review_box {
    padding 25px 20px 0 20px
    margin 25px 0
    background-color: #fff
    .review {
      display: flex
      flex-direction column
      border-bottom 1px solid #D2D7D5
      .title {
        color #333
        font-size 28px
        padding-bottom 30px
        no-wrap()
      }
      .film_box {
        display: flex
        align-items center
        margin 25px 0 25px 0
        .icon_header {
          width: 55px
          height: 55px
          border-radius 50%
          display: inline-block
        }
        .name {
          color #B7B7B7
          font-size 22px
          margin 0 20px
        }
        .score {
          color #A1CB44
          font-size 24px
        }
        .line {
          width: 2px
          height: 28px
          background-color: #B7B7B7
          margin 0 20px
        }
        .comment_num {
          color #B7B7B7
          font-size 22px
        }
      }
    }

    .total_box {
      padding 25px 0
      display: flex
      justify-content center
      align-items center
      font-size 28px
      color #FF8703
    }
  }
</style>
