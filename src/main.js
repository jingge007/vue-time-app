// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'         // 引入vuex
import 'lib-flexible'
import Vant from 'vant'
import {Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'common/style/index.styl'


Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
