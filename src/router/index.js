import Vue from 'vue'
import Router from 'vue-router'
import time from 'components/index/time'
import login from 'components/login/login'
import myTime from 'components/my_time/my_time'
import store from "../store"
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
    path: '/my_time',
    component: myTime
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
if (window.localStorage.getItem('user')) {
  let item = JSON.parse(window.localStorage.getItem('user'));
  store.commit(types.SET_FOOTER_TALG, item.talg);
}


const router = new Router({
  routes
})

export default router
