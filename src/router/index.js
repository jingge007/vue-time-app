import Vue from 'vue'
import Router from 'vue-router'
import time from 'components/index/time'
import login from 'components/login/login'
import store from "../store/"
import * as types from '../store/mutation-types'

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: '/time',
    component: time
  },
  {
    path: '/time',
    component: time
  },
  {
    path: '/login',
    component: login,
    meta: {
      requireAuth_talg: true
    }
  }
]

// 页面刷新时，重新赋值talg
if (window.localStorage.getItem('talg')) {
  console.log(window.localStorage.getItem('talg'));
  store.dispatch(types.SET_FOOTER_TALG, false);
}


const router = new Router({
  routes
})

export default router
