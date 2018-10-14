import axios from 'axios'
import store from '../../store/index'
import *as types from '../../store/mutation-types'

// axios 的配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://api-m.mtime.cn'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {            // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:          // 401清除token信息跳转到登录页面
          store.commit(types.LOGOUT)
          router.currentRoute.path = 'login' && router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.path}
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
