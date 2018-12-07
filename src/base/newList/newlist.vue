<template>
  <div class="newsList">
    <ul>
      <li class="list_box" v-for="item in newsList" @click="newDetail(item.id)">
        <div class="list_01" v-if="item.images.length==0">
          <div class="list_img" :style="{backgroundImage:'url(' + item.image + ')'}">
            <span class="icon" v-show="item.type == 2">
              <i class="iconfont icon-shipin"></i>
            </span>
          </div>
          <div class="list_content">
            <h2 class="list_title">{{item.title}}</h2>
            <div class="list_nav">
              <span class="tag_box" v-show="item.tag !='无'">{{item.tag}}</span>
              <span class="timer">{{item.timer}}</span>
              <span class="comment">{{item.commentCount + ' 评论'}}</span>
            </div>
          </div>
        </div>
        <div class="list_02" v-else>
          <h2 class="list_title">{{item.title}}</h2>
          <div class="img_list">
            <div class="list_img" v-for="img in item.images" :style="{backgroundImage:'url(' + img.url1 + ')'}"></div>
          </div>
          <div class="list_nav">
            <span class="tag_box" v-show="item.tag !='无'">{{item.tag}}</span>
            <span class="timer">{{item.timer}}</span>
            <span class="comment">{{item.commentCount + ' 评论'}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      newsList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {
      // 进入新闻详情页
      newDetail(data) {
        this.$router.push({
          path: `/new_details/${data}`
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .newsList {
    padding 0 20px
    .list_box {
      width: 100%
      border-bottom-1px(#D6D6D6)
      .list_01 {
        display: flex
        padding 30px 0 30px 0
        .list_img {
          background-color: #F3F3F3
          width: 270px
          height: 220px
          border-radius 5px
          margin-right 25px
          background-size cover
          background-position center
          overflow hidden
          position: relative
          .icon {
            position: absolute
            left: 50%
            top: 50%
            transform translate(-50%, -50%)
            .icon-shipin {
              font-size 90px
              color #fff
            }
          }
        }
        .list_content {
          flex 1
          .list_title {
            font-size 32px
            color #000
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .list_nav {
            margin-top 70px
            display: flex
            align-items center
            font-size 25px
            color #9F9F9F
            .tag_box {
              border-radius 2px
              font-size 20px
              display: inline-block
              padding 2px 5px
              color #ffffff
              background-color: #FE4014
              margin-right 25px
            }
            .timer {
              margin-right 25px
            }
          }
        }
      }
    }
    .list_02 {
      padding 20px 0 15px 0
      .list_title {
        font-size 32px
        color #000
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .img_list {
        margin-top 15px
        width: 100%
        display: flex
        align-items center
        justify-content space-between
        .list_img {
          width 32%
          background-color: #F3F3F3
          height: 220px
          background-size cover
          background-position center
        }
      }
      .list_nav {
        margin-top 15px
        display: flex
        align-items center
        font-size 25px
        color #9F9F9F
        .tag_box {
          border-radius 2px
          font-size 20px
          display: inline-block
          padding 2px 5px
          color #ffffff
          background-color: #FE4014
          margin-right 25px
        }
        .timer {
          margin-right 25px
        }
      }
    }
  }
</style>
