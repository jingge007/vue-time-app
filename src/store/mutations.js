import * as types from './mutation-types'

let timeInfo = {};
let list = [];
const mutations = {
  [types.SET_FOOTER_TALG](state, footer_talg) {               // 底部导航条的展示与隐藏的变量
    state.footer_talg = footer_talg
    // timeInfo.talg = footer_talg
    timeInfo.talg = footer_talg
    // localStorage.setItem("user", JSON.stringify(timeInfo));
  },
  [types.SET_CITY_DATA](state, cityData) {                  // 定义获取城市的数据
    state.cityData = cityData
    timeInfo.cityData = cityData
    //  localStorage.setItem("cityData", JSON.stringify(cityData));
  },
  [types.SET_MOVIE_ID](state, movie_id) {
    state.movie_id = movie_id
    timeInfo.movie_id = movie_id
    // timeInfo.movie_id = movie_id.movieId
    // localStorage.setItem("user", JSON.stringify(timeInfo));
  }
}
console.log(mutations)

export default mutations
