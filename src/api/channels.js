import request from '@/utils/request'
import store from '@/store'
// 获取用户频道
// 先从缓存中读取 没有才去查询 本地缓存需要key
const CACHE_CHANNEL_T = 'hm-toutiao-t' // 游客
const CACHE_CHANNEL_U = 'hm-toutiao-u' // 登录的
export function getMyChannels () {
  // return request({
  //   url: '/user/channels'
  // })
  return new Promise(async function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    let str = localStorage.getItem(key)
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      let data = await request({ url: '/user/channels' })
      localStorage.setItem(key, JSON.stringify(data.channels))
      resolve(data) // 将线上获取的数据  通过执行链  下发给下一个 promise
    }
  })
}
// 获取所有频道
export function getAllChannels () {
  return request({
    url: 'channels'
  })
}

// 删除频道
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    let channels = JSON.parse(localStorage.getItem(key))
    let index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      // 有值   删除
      // 直接删除原数组中的数据   （方法一）
      channels.splice(index, 1)
      // 筛选出来不是那个id的新数组，重新写入 （方法二）
      // channels = channels.filter(item => item.id !== id)
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('找不到对应的频道'))
    }
  })
}
