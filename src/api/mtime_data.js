import axios from 'axios'

const API_PROXY = 'https://bird.ioliu.cn/v1/?url=https://api-m.mtime.cn'
const API_TIME = 'https://bird.ioliu.cn/v1/?url=http://m.mtime.cn'
const API_live = 'https://bird.ioliu.cn/v1/?url=http://live-api.mtime.com'
const API_movie = 'https://bird.ioliu.cn/v1/?url=https://ticket-api-m.mtime.cn'
const API_video = 'https://bird.ioliu.cn/v1/?url=https://video-topic-m.mtime.cn'

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
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取首页新闻的数据
export function getNew(page) {
  const url = '/Service/callback.mi/News/NewsList.api';
  const data = Object.assign({}, {
    pageIndex: page
  })
  return axios.get((url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取电影详情的数据
export function getMovieDetails(location_id, movie_id) {
  const url = '/movie/detail.api';
  const data = Object.assign({}, {
    locationId: location_id,
    movieId: movie_id
  })
  return axios.get(API_movie + url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取电影影评的数据
export function getMovieReview(movie_id) {
  const url = '/Service/callback.mi/Movie/HotLongComments.api';
  const data = Object.assign({}, {
    movieId: movie_id
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取电影短评的数据
export function getMovieComment(movie_id, page) {
  const url = '/Service/callback.mi/Showtime/MovieComments.api';
  const data = Object.assign({}, {
    movieId: movie_id,
    pageIndex: page
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取电影短评详情的数据
export function getCommentDetail(reviewId) {
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

// 获取新闻详情的数据
export function getNewDetail(newsId) {
  const url = '/Service/callback.mi/News/Detail.api';
  const data = Object.assign({}, {
    newsId: newsId
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

// 获取电影票房的数据
export function getBoxOffice(page, box_office_id) {
  const url = '/Service/callback.mi/TopList/TopListDetailsByRecommend.api';
  const data = Object.assign({}, {
    type: 1,
    pageIndex: page,
    pageSubAreaID: box_office_id
  })
  return axios.get((url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

// 获取视频列表的数据
export function getVideoList(movieId, page, type) {
  const url = '/api/proxy/ticket/movie/category/video.api';
  const data = Object.assign({}, {
    type: type,
    pageIndex: page,
    movieId: movieId
  })
  return axios.get((API_video + url), {
    params: data
  }).then((res) => {
    return Promise.resolve(res);
  }).catch((err) => {
    console.log(err);
  })
}

