// dayjs 时间格式处理
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 引入中文的语言包
dayjs.extend(relativeTime)
export default {
  // Vue.use(obj) 会调用obj 里的install 方法
  install (Vue) {
    // 插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
    Vue.filter('relTime', relTime) // 注册一个全局相对时间的过滤器
  }
}

// 休眠函数
// function sleep (time = 500)  如果传time 就用传的，若不传 用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 表示等待time时间之后才能 resolve
  })
}

// 相对时间的过滤器 得到一个相对时间
//  value 值 我们认为就是 时间
function relTime (value) {
  // 转换时间到相对时间
  return dayjs().locale('zh-cn').from(value)
}
