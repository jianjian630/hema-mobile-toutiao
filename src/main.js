import Vue from 'vue'
import App from './App.vue'
import router from './router' // 经过权限处理的router
import store from './store'
import Vant, { Lazyload } from 'vant'
import Plugin from '@/utils/plugin'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/styles/index.less'
Vue.use(Vant)
Vue.use(Plugin)
// 挂在图片懒加载
Vue.use(Lazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
