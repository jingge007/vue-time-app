// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'         // 引入vuex
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import 'common/style/index.styl'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  error: require('./assets/error_loading.png'),                  // 这个是请求失败后显示的图片
  loading: require('./assets/load.gif')               // 这个是加载的loading过渡效果
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
