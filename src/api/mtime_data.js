import axios from 'axios'

const API_PROXY = 'https://bird.ioliu.cn/v1/?url=https://api-m.mtime.cn'
const API_TIME = 'https://bird.ioliu.cn/v1/?url=http://m.mtime.cn'

// 获取热映购票的数据
export function getIndex(id) {
  const url = '/Service/callback.mi/Showtime/LocationMovies.api';
  const data = Object.assign({}, {
    locationId: id
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取轮播图的数据
export function getSwiper() {
  const url = '/Service/callback.mi/PageSubArea/GetFirstPageAdvAndNews.api'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
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
