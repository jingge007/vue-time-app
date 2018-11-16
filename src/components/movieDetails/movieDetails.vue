<template>
  <div class="movie_details">
    <div class="movie_details_title">
      <span class="back" @click="back">
        <i class="iconfont icon-zuoyoujiantou1"></i>
      </span>
      <span class="collection">
        <i class="iconfont icon-shoucang"></i>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getMovieDetails} from 'api/mtime_data'
  import {STATUS} from 'api/config_status'

  export default {
    data() {
      return {}
    },
    created() {
      this._getMovieDetails();
    },
    computed: {
      ...mapGetters({
        movie_id: 'movie_id',
        cityData: 'cityData'
      })
    },
    methods: {
      // 获取电影详情数据
      _getMovieDetails() {
        let location_id = this.cityData.id;
        let movie_id = this.movie_id.movieId;
        getMovieDetails(location_id, movie_id).then((res) => {
          if (res.status == STATUS) {
            console.log(res.data.data);
          }
        })
      },
      // 返回按钮
      back() {

      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .movie_details {

  }
</style>
