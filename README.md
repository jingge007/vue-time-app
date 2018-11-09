# vue-time-app (vue时光网APP)

## 项目简介

使用vue2.0仿时光网APP，根据PC端和移动端的时光网进行改造优化。（此项目是个人开发玩的，切勿用于商业用途，否则后果自负！）

项目中的所有API数据接口都是来源PC端和移动端时光网请求的接口详情请截[时光网移动端](http://m.mtime.cn) [时光网PC端](http://www.mtime.com)

## 项目描述
### 技术栈
- vue2.0 + vue-router + vuex：vue全家桶
- axios：用于ajax请求
- vue-lazyload：用于图片懒加载
- better-scroll：移动端滚动库，优化移动端滚动效果
- webpack： 构建工具
- es6: 使用es6语法
- stylus: css预处理

使用flex布局进行移动端适配，用eslint进行代码规范检查

使用localStorage存储相关收藏和搜索的历史记录等数据

webpack + webpack-dev-server + http-proxy-middleware进行本地开发环境http请求转发，实现跨域请求

线上使用express的http-proxy-middleware实现请求转发
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
