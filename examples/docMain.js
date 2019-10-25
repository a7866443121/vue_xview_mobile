// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import demo from './demo'
import router from './router'
import demoBlock from './components/demo-block.vue'
import xview from '../packages/index'
import '../packages/theme-default/lib/index.css'
import api from './api'

let Vue = window.Vue
Vue.component('demo-block', demoBlock)
Vue.use(xview)

Vue.config.productionTip = false
Vue.prototype.$api = api
// 全局扩展一个vue的引用
window.$vue = new Vue()
Vue.prototype.$example = true
/* eslint-disable no-new */
var $docApp = window.$docApp = new Vue({
  el: '#demo',
  router,
  render: h => h(demo)
})
