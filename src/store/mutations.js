import * as types from './mutation-types'

const mutations = {
  [types.SET_FOOTER_TALG](state, footer_talg) {               // 底部导航条的展示与隐藏的变量
    state.footer_talg = footer_talg
    let userInfo = {};
    userInfo.talg = footer_talg
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  [types.SET_CITY_NAME](state, cityName) {                   // 定义当前城市的名称
    state.cityName = cityName
    localStorage.setItem("city", JSON.stringify(cityName));
  }
}

export default mutations
