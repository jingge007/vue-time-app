<template>
  <div class="movie_details" ref="movie_height">
    <img class="filter_box" :src="basicData.img" alt="">
    <!--头部区域-->
    <div class="movie_details_title">
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
      <span class="text">{{basicData.name}}</span>
      <span class="collection">
        <i class="iconfont icon-shoucang"></i>
      </span>
    </div>
    <!--电影详情的内容-->
    <div class="movie_details_box">
      <div class="movie_header">
        <img :src="basicData.img" alt="" class="movie_img">
        <div class="header_content">
          <h2 class="title">{{basicData.name}}</h2>
          <p class="txt">{{basicData.nameEn}}</p>
          <div class="movie_timer">
            <span class="egg_txt" v-show="basicData.isEggHunt">有彩蛋- </span>
            <span>{{basicData.mins}}</span>
          </div>
          <div class="movie_type">{{basicData.movie_type}}</div>
          <div class="show_time">{{basicData.show_time}}</div>
          <div class="comment">{{'"'+basicData.commentSpecial+'"'}}</div>
          <div class="movie_screen">
            <span class="screen_item" v-show="basicData.isDMAX">中国巨幕</span>
            <span class="screen_item" v-show="basicData.isIMAX3D">IMAX 3D</span>
            <span class="screen_item" v-show="basicData.is3D">3D</span>
          </div>
          <div class="score_box">
            <span class="big">{{basicData.score_01}}</span>
            <span class="small">{{basicData.score_02}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getMovieDetails} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {
        basicData: {},
        clientHeight: '',

      }
    },
    mounted() {
      this._getMovieDetails();
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`
    },
    created() {

    },
    computed: {
      ...mapGetters({
        city_id: 'city_id'
      })
    },
    methods: {
      changeFixed(clientHeight) {
        this.$refs.movie_height.style.height = clientHeight + 'px';
      },
      // 获取电影详情数据
      _getMovieDetails() {
        let location_id = this.city_id;
        let movie_id = this.$route.params.id;
        getMovieDetails(location_id, movie_id).then((res) => {
          if (res.status == STATUS) {
            this.handleData(res.data.data.basic)
          }
        })
      },
      handleData(data) {
        if (data) {
          // 电影的类型
          data['movie_type'] = data.type.join(' / ');

          // 电影的上映时间及地区
          data['show_time'] = data.releaseDate.slice(0, 4) + '年' + data.releaseDate.slice(4, 6) + '月' + data.releaseDate.slice(6, 8) + '日' + data.releaseArea + '上映';

          // 评分
          data['score_01'] = data.overallRating.toString().slice(0, 2);
          data['score_02'] = data.overallRating.toString().slice(2, 3);
          console.log(data);
          this.basicData = data;
        }

      },
      // 返回按钮
      back() {
        this.$router.back(-1);
      }
    },
    watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .movie_details {
    width: 100%
    position: relative
    .filter_box {
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      z-index: -1;
      transition: filter 1s;
      filter: blur(40px);
    }
    .movie_details_title {
      margin-bottom 250px
      height: 90px
      line-height: 90px
      text-align: center
      background-color: #202534
      color #F4FAFB
      font-size 32px
      position: relative
      .back {
        position: absolute
        top: 50%
        transform translateY(-50%)
        left: 20px
        .icon-zuoyoujiantou1 {
          font-size 50px
        }
      }
      .collection {
        position: absolute
        top: 50%
        transform translateY(-50%)
        right: 25px
        .icon-shoucang {
          font-size 50px
        }
      }
    }

    .movie_header {
      padding 0 25px
      display: flex
      background-color: #fff
      .movie_img {
        padding 4px 4px 0 4px
        background-color: #fff
        width: 250px
        height: 350px
        display: inline-block
        margin-top -100px
      }
      .header_content {
        margin-top -100px
        padding-top 5px
        color #FAFFFF
        position: relative
        padding-left 30px
        .title {
          font-size 32px
        }
        .txt {
          width 70%
          margin-top 5px
          font-size 28px
          display: inline-block
          no-wrap()
        }
        .movie_timer {
          margin-top 25px
          display: flex
          align-items center
          font-size 28px
          color #333
          .egg_txt {
            color #659d0e
          }
        }
        .movie_type, .show_time, .comment {
          margin-top 10px
          color #333
          font-size 28px
        }
        .comment {
          color #FF8703
        }
        .movie_screen {
          display flex
          align-items center
          margin-top 12px
          .screen_item {
            padding 5px 8px
            border 1px solid #899FAD
            color #899FAD
            text-align: center
            margin-right 15px
          }
        }
        .score_box {
          background-color: #669E14
          color #fff
          position: absolute
          right 20px
          top 65px
          padding 17px 10px
          text-align: center
          .big {
            font-size 38px
            padding-right 28px
          }
          .small {
            font-size 30px
            display: inline-block
            position: absolute
            top 17px
            right 15px
          }
        }
      }
    }
  }
</style>
