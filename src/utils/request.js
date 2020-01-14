import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 创建一个新的 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (err) { return Promise.reject(err) })

// 响应拦截器
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    // if (!user.token || !user.refresh_token) {
    //   router.push(toPath)
    //   return false
    // }
    if (store.state.user.refresh_token) {
      try {
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',

          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config)
      } catch (error) {
        store.commit('clearUser')
        router.push(toPath)
      }
    } else {
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance
