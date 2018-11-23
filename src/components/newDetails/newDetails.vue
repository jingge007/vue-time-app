<template>
  <div class="new_details">
    <!--头部区域-->
    <div class="citylist_box_nav">
      选择城市
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
    </div>
    <!--新闻内容-->
    <h2 class="new_title">{{newsData.title}}</h2>
    <div class="title_nav">
      <span>{{newsData.time}}</span>
      <span>{{newsData.source}}</span>
    </div>
    <div class="news_content" v-html="newsData.content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getNewDetail} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        newsData: {}
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
      _getNewDetail() {
        let newsId = this.$route.params.id
        getNewDetail(newsId).then((res) => {
          if (res.status == STATUS) {
            this.newsData = res.data;
            console.log(res);
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .new_details {
    background-color: #fff
    width: 100%
    .citylist_box_nav {
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
    .new_title {
      padding 25px
      color #000
      font-size 40px
    }
    .title_nav {
      margin 0 auto
      width: 60%
      display: flex
      align-items center
      justify-content space-between
      padding 10px 25px
      font-size 25px
      color #C0BFBF
    }
    .news_content {
      padding 0 25px
      color #666
      font-size 30px
    }
  }
</style>
