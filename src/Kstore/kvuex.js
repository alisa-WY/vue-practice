// 保存构造函数引用，避免import,打包的时候就不会打包进去
let Vue

class Store {
  constructor (options) {
    this._mutations = options.mutations
    this._actions = options.mutations
    // 想用options必须赋值
    this.$options = options
    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state
    // })

    // 优化代码对state进行保护，让用户不能直接修改
    this._vm = new Vue({
      data: {
        // 加上两个$$,vue不做代理，也就是隐藏起来，用户访问不到
        $$state: options.state
      }
    })

    // 绑定commit、dispath的上下文的store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器  store.state
  get state () {
    console.log(this._vm)
    return this._vm.$data.$$state
    // return this.$vm.data.$$state
  }

  set state (v) {
    console.log('三思')
  }
  // store.commit('add',1)
  // type: mutation的类型
  // payload: 载荷，是参数

  commit (type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch (type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }
}

function install (_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
// 导出一个对象Vuex
export default {
  Store,
  install
}
