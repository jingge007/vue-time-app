import Vue from 'vue'
import Router from 'vue-router'
import time from 'components/index/time'
import login from 'components/login/login'
import myTime from 'components/my_time/my_time'
import citylist from 'components/citylist/citylist'
import movieDetails from 'components/movieDetails/movieDetails'
import newDetails from 'components/newDetails/newDetails'
import store from "../store"
import * as types from '../store/mutation-types'

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: '/time',
    component: time,
    meta: {navShow: true}
  },
  {
    path: '/time',
    component: time,
    meta: {navShow: true}
  },
  {
    path: '/my_time',
    component: myTime,
    meta: {keepAlive: true, navShow: true}
  },
  {
    path: '/login',
    component: login,
    meta: {
      requireAuth_talg: true,
      navShow: false
    }
  },
  {
    path: '/citylist',
    component: citylist,
    meta: {keepAlive: true, navShow: false}
  },
  {
    path: '/movie_details/:id',
    name: 'movieDetails',
    component: movieDetails,
    meta: {
      navShow: false
    }
  },
  {
    path: '/new_details/:id',
    name: 'newDetails',
    component: newDetails,
    meta: {
      navShow: false
    }
  },
]

// 页面刷新时，重新赋值talg
if (window.localStorage.getItem('cityData')) {
  let item = JSON.parse(window.localStorage.getItem('cityData'));
  store.commit(types.SET_CITY_DATA, item);
}

if (window.localStorage.getItem('city_id')) {
  let item = JSON.parse(window.localStorage.getItem('city_id'));
  store.commit(types.SET_CITY_ID, item);
}


const router = new Router({
  routes
})

export default router
