// 编译器
// 递归遍历DOM树
// 判断节点类型，如果是文本，则判断是否是插值绑定
// 如果是元素，则遍历其属性判断是否是指令或事件，然后递归
class Compile {
  // el是宿主元素
  // vm是KVue实例
  constructor (el, vm) {
    // 保存一下数据
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      // 如果存在则执行一下编译函数
      this.compile(this.$el)
    }
  }

  compile (el) {
    // 遍历el树
    const childNodes = el.childNodes
    // childNodes不是一个数组，先转成数组
    Array.from(childNodes).forEach(node => {
      // 判断是否是元素
      if (this.isElement(node)) {
        console.log('编译元素' + node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        console.log('编译插值绑定' + node.textContent)
        // 编译文本
        this.compileText(node)
      }

      // 解决嵌套问题，递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // -判断是否是元素
  isElement (node) {
    return node.nodeType === 1
  }

  // 判断是否是插值绑定
  isInter (node) {
    // 首先是文本，其次内容是{{***}}
    // 正则表达式，只要有()分组，就会把值放进RegExp里面
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 编译文本
  compileText (node) {
    // 原生dom编程
    // console.log(RegExp.$1)
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素
  compileElement (node) {
    // 节点是元素
    // 遍历其属性列表
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定以k-xx = 'oo' 定义，就是我们想要的属性
      const attrName = attr.name // k-xx
      const exp = attr.value // 00
      // 判断是否有属性以k-开头
      if (this.isDirective(attrName)) {
        // 截取后面的指令
        const dir = attrName.substring(2) // xx
        // 执行指令，先判断指令是否存在
        this[dir] && this[dir](node, exp)
      }
    })
  }

  isDirective (attr) {
    return attr.indexOf('k-') === 0
  }

  // 全局更新函数
  update (node, exp, dir) {
    // 初始化
    // 指令对应更新函数xxUpdater
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新处理，封装一个更新函数，可以更新对应的dom元素
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }

  textUpdater (node, value) {
    node.textContent = value
  }

  // k-text
  text (node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }

  // k-html
  html (node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }

  htmlUpdater (node, value) {
    node.innerHTML = value
  }
}
