import Vue from 'vue'
import App from './App.vue'
import router from './router' // 经过权限处理的router
import store from './store'
import Vant from 'vant'
import Plugin from '@/utils/plugin'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/styles/index.less'
Vue.use(Vant)
Vue.use(Plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
