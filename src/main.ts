import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// 自己创建的路由
import router from './Krouter'
// import store from './store'
import store from './Kstore'
// 此处的create是一个函数
import create from './utils/create'
import './test-ts'

Vue.config.productionTip = false

// 时间总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create
// 改成插件形式
Vue.use(create)

// 3.挂载router实例
new Vue({
  router, // Vue.prototype.$router = router
  store,
  render: h => h(App)
}).$mount('#app')
