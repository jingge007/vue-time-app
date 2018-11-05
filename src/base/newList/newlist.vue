<template>
  <div class="newsList">
    <ul>
      <li class="list_box" v-for="item in newsList">
        <div class="list_img" :style="{backgroundImage:'url(' + item.image + ')'}">
          <!-- <img :src="item.image" alt="">-->
        </div>
        <div class="list_content">
          <h2 class="list_title">{{item.title}}</h2>
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
  import {getNew} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import {timer} from 'common/js/public_time'

  export default {
    data() {
      return {
        newsList: [],
      }
    },
    created() {
      this._getNew();
    },
    methods: {
      // 获取新闻列表的数据
      _getNew() {
        getNew().then((res) => {
          if (res.status == STATUS) {
            // console.log(res.data)
            this.timeStamp(res.data.newsList)
          }
        })
      },
      // 对新闻列表时间戳的处理
      timeStamp(data) {
        data.forEach((item, idx) => {
          if (item.publishTime) {
            item['timer'] = timer.dateDiff(item.publishTime)
          }
        })
        this.newsList = data;
        // console.log(this.newsList)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .newsList {
    padding 0 5px
    .list_box {
      padding 30px 0 30px 0
      width: 100%
      display: flex
      border-bottom-1px(#D6D6D6)
      .list_img {
        width: 270px
        height: 220px
        border-radius 5px
        margin-right 25px
        background-size cover
        background-position center
        overflow hidden
        /*img {
          width: 100%
          height: 100%
        }*/
      }
      .list_content {
        flex 1
        .list_title {
          font-size 32px
          color #000
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
</style>
