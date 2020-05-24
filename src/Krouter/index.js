import Vue from 'vue'
import VueRouter from './KVue-router'
import Home from '../views/Home.vue'
import Communication from '../components/communication/index.vue'
import KForm from '../components/KForm/index.vue'
import WForm from '../components/form练习/index.vue'
// 1.应用插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/communication',
    name: 'Communication',
    component: Communication
  },
  {
    path: '/KForm',
    name: 'KForm',
    component: KForm
  },
  {
    path: '/WForm',
    name: 'WForm',
    component: WForm
  }
]

// 2.创建实例
const router = new VueRouter({
  routes
})

export default router
