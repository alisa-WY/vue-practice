import Link from './Krouter-link'
import View from './Krouter-view'
let Vue
// 1.实现一个插件，挂载$router
class KVueRouter {
  constructor (options) {
    this.$options = options
    // 需要创建响应式的current属性
    // this.current = '/'
    Vue.util.defineReactive(this, 'current', '/')

    // 第二种响应时
    // this.app = new Vue({
    //   data () {
    //     return {
    //       current: '/'
    //     }
    //   }
    // })

    // 监控URL变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // 创建一个路由映射表,path => component
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}

KVueRouter.install = function (_Vue) {
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue
  // 挂载$router
  // 怎么获取根实例中的$router选项
  Vue.mixin({
    beforeCreate () {
      // 这里确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 任务2：实现两个全局组件router-link和router-view
  // 存运行时函数只能使用render渲染，不能使用template
  //   Vue.component('router-link', {
  //     props: {
  //       to: {
  //         type: String,
  //         required: true
  //       }
  //     },
  //     render (h) {
  //       // <a href='#/about'></a>
  //       // <router-link to="./about">内容作为children</router-link>
  //       // h(tag, data, children)
  //       return h('a', { attrs: { href: '#' + this.to }, class: 'haha' }, this.$slots.default)
  //     }
  //   })
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
  //   Vue.component('router-view', {
  //     // 获取path对应的component
  //     // 只要render里面有响应式的变量，只要对应数据变化，render就会重新响应一次
  //     render (h) {
  //     //   let component = null

  //       // 对下面优化的
  //       const { routeMap, current } = this.$router
  //       const component = routeMap[current].component || null
  //       return h(component)

  //       // 对下面进行优化，因为下面每次运行都要重新遍历
  //       //   this.$router.$options.routes.forEach(route => {
  //       //     if (route.path === this.$router.current) {
  //       //       component = route.component
  //       //     }
  //       //   })
  //       //   return h(component)
  //     }
  //   })
}

export default KVueRouter
