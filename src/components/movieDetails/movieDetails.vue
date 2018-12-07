<template>
  <div class="details_box">
    <div class="movie_details">
      <img class="filter_box" :src="basicData.img" alt="">
      <!--头部区域-->
      <div class="movie_details_icon">
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
        <span class="collection">
        <i class="iconfont icon-shoucang"></i>
      </span>
      </div>
      <div class="movie_title" :style="{opacity:movie_title}">
        <span>{{basicData.name}}</span>
      </div>
      <!--电影详情的内容-->
      <div ref="talgBox" class="movie_content">
        <div class="movie_details_box">
          <div class="movie_header">
            <div class="movie_img">
              <img :src="basicData.img" alt="">
              <span class="play_icon">
              <i class="iconfont icon-bofangshipin"></i>
            </span>
            </div>
            <div class="header_content">
              <h2 class="title">{{basicData.name}}</h2>
              <p class="txt">{{basicData.nameEn}}</p>
              <div class="movie_timer">
                <span class="egg_txt" v-show="basicData.isEggHunt">有彩蛋- </span>
                <span>{{basicData.mins}}</span>
              </div>
              <div class="movie_type">{{basicData.movie_type}}</div>
              <div class="show_time">{{basicData.show_time}}</div>
              <div class="comment" v-show="basicData.commentSpecial">{{'"'+basicData.commentSpecial+'"'}}</div>
              <div class="movie_screen">
                <span class="screen_item" v-show="basicData.isDMAX">中国巨幕</span>
                <span class="screen_item" v-show="basicData.isIMAX3D">IMAX 3D</span>
                <span class="screen_item" v-show="basicData.is3D">3D</span>
              </div>
              <div class="score_box" v-show="basicData.score_01>0">
                <span class="big">{{basicData.score_01}}</span>
                <span class="small">{{basicData.score_02}}</span>
              </div>
            </div>
          </div>
          <div class="movie_plot" ref="plotHeight" :class="{more_txt:more_talg}">{{basicData.plot}}</div>
          <div class="more_button" @click="moreBtn">
            <i class="iconfont icon-down_arrow" :class="{rotate_icon:more_talg}"></i>
          </div>
        </div>
        <!--电影票房-->
        <div class="box_office">
          <div class="box_item">
            <span class="num_txt" style="padding-right: 10px">{{boxData.ranking}}</span>
            <div class="text">
              <span>票房排名</span>
              <i class="iconfont icon-zuoyoujiantou"></i>
            </div>
          </div>
          <div class="box_item" v-show="boxData.todayBoxDes || boxData.todayBoxDesUnit">
            <span class="num_txt">{{boxData.todayBoxDes}}</span>
            <div class="text">
              <span>{{boxData.todayBoxDesUnit}}</span>
              <i class="iconfont icon-zuoyoujiantou"></i>
            </div>
          </div>
          <div class="box_item">
            <span class="num_txt">{{boxData.totalBoxDes}}</span>
            <div class="text">
              <span>{{boxData.totalBoxUnit}}</span>
              <i class="iconfont icon-zuoyoujiantou"></i>
            </div>
          </div>
        </div>
        <!--图片列表-->
        <div class="img_list">
          <div class="img_title">
            <span>{{'电影剧照('+countNum+'张)'}}</span>
            <div class="img_icon">
              <span>全部</span>
              <i class="iconfont icon-zuoyoujiantou"></i>
            </div>
          </div>
          <div class="img_box" v-show="imgData.length>0">
            <span v-for="(item,index) in imgData" :key="index" :style="{backgroundImage:'url(' + item.imgUrl + ')'}"></span>
          </div>
        </div>
        <!--导演/演员列表-->
        <actor-list :actorList="actorList"></actor-list>
        <!--短评-->
        <comment :movie_id="movie_id"></comment>
      </div>
      <!--加载动画-->
      <loading v-show="!talgShow"></loading>
    </div>
    <!--选座购票-->
    <div class="selection_box">
      <div class="want_item">
        <i class="iconfont icon-xiangkan"></i>
        <span class="txt">想看</span>
        <span class="line"></span>
      </div>
      <div class="score_item">
        <i class="iconfont icon-pingfenqia"></i>
        <span class="txt">评论/评分</span>
      </div>
      <div class="selection_item">选座购票</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getMovieDetails} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'
  import loading from 'base/loading/loading'
  import actorList from 'base/actorList/actorList'
  import comment from 'base/comment/comment'

  export default {
    data() {
      return {
        basicData: {},
        clientHeight: '',
        more_talg: false,
        actorList: [],
        countNum: '',
        imgData: [],
        talgShow: false,
        movie_title: 0,
        boxData: {},
        movie_id: '',
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    created() {
      this._getMovieDetails();
    },
    computed: {
      ...mapGetters({
        city_id: 'city_id'
      })
    },
    methods: {
      // 获取电影详情数据
      _getMovieDetails() {
        let location_id = this.city_id;
        this.movie_id = this.$route.params.id;
        getMovieDetails(location_id, this.movie_id).then((res) => {
          if (res.status == STATUS) {
            this.talgShow = true;
            this.handleData(res.data.data.basic)
            this.boxData = res.data.data.boxOffice;
          } else {
            this.talgShow = false;
          }
        })
      },
      // 处理电影详情的数据
      handleData(data) {
        if (data) {
          // 电影的类型
          data['movie_type'] = data.type.join(' / ');

          // 电影的上映时间及地区
          data['show_time'] = data.releaseDate.slice(0, 4) + '年' + data.releaseDate.slice(4, 6) + '月' + data.releaseDate.slice(6, 8) + '日' + data.releaseArea + '上映';

          // 评分
          if (data.overallRating > 0) {
            let score = this.normalizeScore(data.overallRating);
            data['score_01'] = score.toString().slice(0, 2);
            data['score_02'] = score.toString().slice(2, 3);
          }

          // 电影剧情
          data['plot'] = '剧情：' + data.story;

          // 导演/演员列表的数据
          let item = [];
          let director = {
            actorId: data.director.directorId,
            img: data.director.img,
            name: data.director.name,
            nameEn: data.director.nameEn,
            roleImg: '',
            roleName: ''
          }
          item.push(director)
          this.actorList = item.concat(data.actors);

          // 电影剧照的数据
          this.countNum = data.stageImg.count;
          this.imgData = data.stageImg.list;
          this.basicData = data;
        }
      },
      // 返回按钮
      back() {
        this.$router.back(-1);
      },
      // 点击展开更多的剧情内容
      moreBtn() {
        this.more_talg = !this.more_talg
      },
      // 标题栏背景渐变
      handleScroll() {
        let item = (window.pageYOffset) / 100;
        this.movie_title = item;
        if (item >= 1) {
          this.movie_title = 1;
        }
        if (item <= 0) {
          this.movie_title = 0;
        }
      },
      // 电影评分末尾补零
      normalizeScore(item) {
        let len = item.toString().length
        if (len < 2) {
          return `${item}.0`
        }
        return item
      }
    },
    watch: {},
    components: {
      loading,
      actorList,
      comment
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~@/common/style/mixin.styl"
  .details_box {
    .movie_details {
      width: 100%
      position: relative
      padding 200px 0 80px 0
      .filter_box {
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 500px
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        z-index: -1;
        transition: filter 1s;
        filter: blur(40px);
      }
      .movie_details_icon {
        width: 100%
        position: fixed
        top: 0
        left: 0
        z-index: 200
        height: 90px
        line-height: 90px
        color #F4FAFB
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
      .movie_title {
        width: 100%
        position: fixed
        top: 0
        left: 0
        color #F4FAFB
        font-size 32px
        z-index: 100
        height: 90px
        line-height: 90px
        text-align: center
        background-color: #202534
        animation all .5s linear
        span {
          width: 70%
          height: 100%
          display: inline-block
          no-wrap()
        }
      }

      .movie_content {
        background-color: #ebebeb
        .movie_details_box {
          padding 0 25px
          background-color: #fff
          .movie_header {
            display: flex
            margin-bottom 60px
            .movie_img {
              padding 4px 4px 0 4px
              background-color: #fff
              width: 240px
              height: 350px
              display: inline-block
              margin-top -100px
              position: relative
              img {
                width: 240px
                height: 350px
                display: inline-block
              }
              .play_icon {
                position: absolute
                top: 50%
                left: 50%
                transform translate(-50%, -50%)
                .iconfont {
                  font-size 130px
                  color #fff
                }
              }
            }
            .header_content {
              flex 1
              margin-top -100px
              padding-top 5px
              color #FAFFFF
              position: relative
              padding-left 30px
              .title {
                font-size 32px
                width 420px
                no-wrap()
              }
              .txt {
                width 320px
                margin-top 5px
                font-size 28px
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
                width 420px
                no-wrap()
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
                right 0
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

          .movie_plot {
            color #333
            font-size 30px
            height 80px
            overflow: hidden
            transition: all .3s ease
          }
          .more_txt {
            height auto
            overflow auto
          }
          .more_button {
            text-align: center
            padding 10px 0 8px 0
            .icon-down_arrow {
              font-size 45px
              color #BCC1BF
            }
            .icon-down_arrow:before {
              display: inline-block
              transform rotate(0deg)
              transition: all .5s ease
            }
            .rotate_icon:before {
              display: inline-block
              transform rotate(-180deg)
            }
          }
        }

        .box_office {
          background-color: #fff
          margin 25px 0
          display: flex
          align-items center
          justify-content space-around
          padding 25px 0
          .box_item {
            display: flex
            flex-direction column
            justify-content: center
            align-items center
            .num_txt {
              font-size 40px
              color #FF8703
              margin-bottom 10px
            }
            .text {
              display: flex
              align-items center
              font-size 26px
              color #969B99
              .iconfont {
                font-size 38px
                color #969B99
              }
            }
          }
        }
        .img_list {
          margin-top 25px
          padding 20px
          background-color: #fff
          .img_title {
            display: flex
            align-items center
            justify-content space-between
            font-size 32px
            color #333
            margin-bottom 15px
            .img_icon {
              font-size 32px
              display: flex
              align-items center
              color #9CA19F
              .iconfont {
                font-size 40px
                padding-bottom 6px
                color #9CA19F
              }
            }
          }
          .img_box {
            width: 100%
            display: flex
            align-items center
            justify-content space-around
            span {
              width: 160px
              height: 160px
              display: inline-block
              background-size 100% 100%
              background-position center
            }
          }
        }
      }
    }
    .selection_box {
      position: fixed
      bottom 0
      left: 0
      z-index 9999
      width: 100%
      background-color: #fff
      display: flex
      height: 100px
      align-items center
      color #838383
      .want_item, .score_item {
        border-top 2px solid #E4E4E4
        box-sizing border-box
        flex 2.5
        height: 100%
        display: flex
        flex-direction column
        align-items center
        justify-content center
        position: relative
        .iconfont {
          font-size 45px
          color #838383
        }
        .txt {
          display: inline-block
          margin-top 2px
          font-size 25px
          color #838383
        }
        .line {
          position: absolute
          right 0
          top: 50%
          transform translateY(-50%)
          height 50%
          width 2px
          background-color: #E4E4E4
        }
      }
      .score_item {
        flex 3
      }
      .selection_item {
        flex 6
        height: 100%
        color #fff
        font-size 35px
        background-color: #FF8703
        display: flex
        justify-content center
        align-items center
      }
    }
  }
</style>
