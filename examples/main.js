import Vue from 'vue'
import App from './App'
import router from './router'
import demoBlock from './components/demo-block.vue'
import NVUI from '../packages/index'
import axios from 'axios'
import promise from 'es6-promise'
import '../packages/theme-default/lib/index.css'
Vue.prototype.$ajax = axios
Vue.component('demo-block', demoBlock)
Vue.use(NVUI)
promise.polyfill()
Vue.config.productionTip = false

/* eslint-disable no-new */
// 禁止eslint检查
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
