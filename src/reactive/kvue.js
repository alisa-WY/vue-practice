function defineReactive (obj, key, val) {
  // 递归，深度遍历
  observer(val)

  // 创建一个Dep和当前key一一对应
  const dep = new Dep()

  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get () {
      console.log('get ' + key)
      // 依赖收集在这里
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal)
        // 如果传入的newval依然是obj，需要做响应化处理，接着递归
        observer(newVal)
        val = newVal

        // set触发即值发生变化，触发watcher
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })
}

// 遍历数据，判断数据类型
function observer (obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的数据类型是obj
    return
  }
  // 创建observer实例
  new Observer(obj)
}

// 代理函数，方便用户直接访问$data中的数据,参数：框架实例，要代理的key
function Proxy (vm, sourceKey) {
  Object.keys(vm[sourceKey]).forEach(key => {
    // 将$data中的key代理到vm属性中
    Object.defineProperty(vm, key, {
      get () {
        return vm[sourceKey][key]
      },
      set (newVal) {
        vm[sourceKey][key] = newVal
      }
    })
  })
}

// 创建kvue构造函数
class KVue {
  constructor (options) {
    // 保存选项
    this.$options = options
    // 保存数据
    this.$data = options.data
    // 响应化处理
    observer(this.$data)

    // 代理
    Proxy(this, '$data')

    // 创建编译器
    new Compile(options.el, this)
  }
}

// 根据对象类型决定如何做响应化
class Observer {
  constructor (value) {
    this.value = value

    // 判断其类型
    if (typeof value === 'object') {
      // 是对象遍历
      this.walk(value)
    }
  }

  // 对象数据响应化
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  // 数组数据响应化
}

// 观察者：保存更新函数，值发生变化调用更新函数

// 我们进行优化，不要每次改变调用所有，而是依赖收集
// const watchers = []
class Watcher {
  constructor (vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // watchers.push(this)

    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key]// 读取触发getter
    Dep.target = null// 收集完就置空
  }

  update () {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// Dep: 依赖，管理某个key相关所有Watcher实例
class Dep {
  constructor () {
    this.deps = []
  }

  addDep (dep) {
    this.deps.push(dep)
  }

  notify () {
    this.deps.forEach(dep => dep.update())
  }
}
