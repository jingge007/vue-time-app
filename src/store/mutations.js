import * as types from './mutation-types'

const mutations = {
  [types.SET_CITY_DATA](state, cityData) {                  // 定义获取城市的数据
    state.cityData = cityData
    localStorage.setItem("cityData", JSON.stringify(cityData));
  },

  [types.SET_CITY_ID](state, city_id) {                  // 定义获取城市的id
    state.city_id = city_id
    localStorage.setItem("city_id", JSON.stringify(city_id));
  }
}

export default mutations
