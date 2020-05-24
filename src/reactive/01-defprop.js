// 响应式
// const obj = {}

// 通过get方法将变量val暴露在函数作用域之外，所以外面可以访问，只要外面还存在引用，就一直存在不释放，闭包
function defineReactive (obj, key, val) {
  // 递归，深度遍历
  observe(val)
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get () {
      console.log('get ' + key)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal)
        // 如果传入的newval依然是obj，需要做响应化处理，接着递归
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 遍历数据，判断数据类型
function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的数据类型是obj
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function set (obj, key, val) {
  defineReactive(obj, key, val)
}

// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'foooooooooo'

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1, 2, 3] }
// 遍历做响应化处理
observe(obj)
// obj.foo
// obj.foo = 'fooooooo'
// obj.bar
// obj.bar = 'barrrrrr'

obj.baz.a = 10
obj.baz = { a: 1000 }
obj.baz.a = 100000
// 因为这是obj后添加新属性，所以不是响应式的
obj.dong = 'dong'
// obj.dong
set(obj, 'dong', 'dong')
// obj.dong

// object.defineProperty()对数组无效
// 分析：改变数组的方法只有七个，覆盖这些方法
// 解决方案：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4)
