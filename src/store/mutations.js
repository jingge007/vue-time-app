import * as types from './mutation-types'

const mutations = {
  [types.SET_FOOTER_TALG](state, footer_talg) {               // 底部导航条的展示与隐藏的变量
    state.footer_talg = footer_talg
    localStorage.setItem("talg", footer_talg);
  }
}

export default mutations
