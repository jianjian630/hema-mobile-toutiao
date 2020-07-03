import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser(), // 从缓存中获取数据
    photo: null
  },
  mutations: {
    // 更新数据
    updateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储中
    },
    // 清空 user
    clearUser (state) {
      state.user = {}
      auth.delUser()
    },
    // 更新头像
    updatePhoto (state, payload) {
      state.photo = payload.photo
    }
  },
  // 异步处理数据
  actions: {
  },
  // 状态管理器的模块组
  modules: {
  }
})
