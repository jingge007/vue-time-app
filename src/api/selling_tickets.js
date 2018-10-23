import axios from 'axios'

const API_PROXY = 'https://bird.ioliu.cn/v1/?url=https://api-m.mtime.cn'
const API_TIME = 'https://bird.ioliu.cn/v1/?url=https://m.mtime.cn'

// 获取热映购票的数据
export function getTickets(id) {
  const url = '/PageSubArea/HotPlayMovies.api';
  const data = Object.assign({}, {
    locationId: 290,
    count: 100
  })
  return axios.get(API_PROXY + url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取首页的数据
export function getIndex() {
  const url = '/Service/callback.mi/Showtime/LocationMovies.api';
  const data = Object.assign({}, {
    locationId: 290
  })
  return axios.get(API_TIME + url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取城市列表的数据
export function getCity() {
  const url = '/Service/callback.mi/Showtime/HotCitiesByCinema.api';
  return axios.get(API_TIME + url, {}).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}
