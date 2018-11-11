import Vue from 'vue'
import Router from 'vue-router'
import time from 'components/index/time'
import login from 'components/login/login'
import myTime from 'components/my_time/my_time'
import citylist from 'components/citylist/citylist'
import store from "../store"
import * as types from '../store/mutation-types'

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: '/time',
    component: time,
   // meta: {keepAlive: true}
  },
  {
    path: '/time',
    component: time,
   // meta: {keepAlive: true}
  },
  {
    path: '/my_time',
    component: myTime,
    meta: {keepAlive: true}
  },
  {
    path: '/login',
    component: login,
    meta: {
      requireAuth_talg: true
    }
  },
  {
    path: '/citylist',
    component: citylist,
    meta: {keepAlive: true}
  },
]

// 页面刷新时，重新赋值talg
if (window.localStorage.getItem('user')) {
  let item = JSON.parse(window.localStorage.getItem('user'));
  store.commit(types.SET_FOOTER_TALG, item.talg);
}

if (window.localStorage.getItem('cityData')) {
  let item = JSON.parse(window.localStorage.getItem('cityData'));
  store.commit(types.SET_CITY_DATA, item);
}


const router = new Router({
  routes
})

export default router
