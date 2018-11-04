import * as types from './mutation-types'
const mutations = {
  [types.SET_FOOTER_TALG](state, footer_talg) {               // 底部导航条的展示与隐藏的变量
    state.footer_talg = footer_talg
    let userInfo = {};
    userInfo.talg = footer_talg
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  [types.SET_CITY_DATA](state, cityData) {                  // 定义获取城市的数据
    state.cityData = cityData
    localStorage.setItem("cityData", JSON.stringify(cityData));
  }
}

export default mutations