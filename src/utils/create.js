import Vue from 'vue'
import Notice from '../components/Notice.vue'
// function create (Component, props) {
//   // 组建的构造函数如何获取？
//   // 1.vue.extend()
//   // 2.render
//   const vm = new Vue({
//     // h 是createElement，返回虚拟节点
//     // 虚拟节点需要挂载才能变成真实节点
//     render: h => h(Component, { props })
//   }).$mount()// 不指定宿主元素，则会创建真实dom，但是不会追加操作
//   // 获取真实dom
//   document.body.appendChild(vm.$el)
//   // 获取组件实例
//   const comp = vm.$children[0]
//   // 删除淘汰机制
//   comp.remove = function () {
//     document.body.removeChild(vm.$el)
//     vm.$destroy()
//   }
//   return comp
// }

function create (Component, props) {
  const Ctor = Vue.extend(Component)
  // 组件实例
  const comp = new Ctor({ propsData: props })
  // 将实例挂载，变成真实dom节点
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}
// export default create

// 导出对象，实现插件，插件要接受vue 的构造函数,下面典型的函数柯里化
export default {
  install (Vue) {
    Vue.prototype.$notice = function (options) {
      return create(Notice, options)
    }
  }
}
