import Vue from 'vue'
import Router from 'vue-router'
import time from 'components/index/time'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/time', component: time},
    {path: '/time', component: time}
  ]
})
