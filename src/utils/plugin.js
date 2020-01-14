export default {
  // Vue.use(obj) 会调用obj 里的install 方法
  install (Vue) {
    // 插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
  } }
