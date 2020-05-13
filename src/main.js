import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem插件
import 'amfe-flexible'
// 引入全局样式
import './assets/scss/reset.scss'
import './assets/scss/common.scss'
// 引入vant组件
import './plugin/vant_import'
// 引入axios
import './plugin/createAjax'
// 全局过滤
import './plugin/filter'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')