import axios from 'axios'

const API_PROXY = 'https://bird.ioliu.cn/v1/?url=https://api-m.mtime.cn'
const API_TIME = 'https://bird.ioliu.cn/v1/?url=http://m.mtime.cn'
const API_live = 'https://bird.ioliu.cn/v1/?url=http://live-api.mtime.com'

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

// 获取首页新闻的数据
export function getNew(page) {
  const url = '/Service/callback.mi/News/NewsList.api';
  const data = Object.assign({}, {
    pageIndex: 1
  })
  return axios.get((url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取新闻详情的数据
export function getNewDetail(newsId) {
  const url = '/Service/callback.mi/News/Detail.api';
  const data = Object.assign({}, {
    newsId: 1585772
  })
  return axios.get((url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取直播的数据
export function getLive(pageNo, pageSize) {
  const url = '/live_room/getWonderVodList';
  const data = Object.assign({}, {
    pageNo: 11,
    pageSize: 15
  })
  return axios.get((API_live + url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取直播详情的数据
export function getLiveDetail(locationId, liveId) {
  const url = '/live/detail';
  const data = Object.assign({}, {
    locationId: 290,
    liveId: 894,
    version: 2,
    clientId: 'webetf1541261520278'
  })
  return axios.get((API_live + url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取影评的数据
export function getReview() {
  const url = '/Service/callback.mi/MobileMovie/Review.api';
  const data = Object.assign({}, {
    needTop: false
  })
  return axios.get((API_live + url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取影评详情的数据
export function getReviewDetail(reviewId) {
  const url = '/Service/callback.mi/Review/Detail.api';
  const data = Object.assign({}, {
    reviewId: 8063429
  })
  return axios.get((API_live + url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}
