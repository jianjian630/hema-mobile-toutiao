import router from '@/router'
// import { Store } from 'vuex'
import store from '@/store'
// 设置导航守卫
router.beforeEach((to, from, next) => {
  const login = { path: '/login', query: { redirectUrl: to.path } }
  if (to.path.startsWith('/user') && !store.state.user.token) return next(login)
  else next()
})
