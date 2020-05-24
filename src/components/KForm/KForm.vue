<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  /* 接收数据和校验规则 */
  /* 把接收到的数据和校验规则分发下去 */
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate (cb) {
      // 获取所有的KFormItem
      // task是数组里面放着所有校验的结果
      const tasks = this.$children
        .filter(item => item.prop)// 过滤掉没有prop属性的元素
        .map(item => item.validate())
      // 统一处理所有的promise结果
      Promise.all(tasks)
        // eslint-disable-next-line standard/no-callback-literal
        .then(() => cb(true))
        // eslint-disable-next-line standard/no-callback-literal
        .catch(() => cb(false))
    }
  }
}
</script>

<style>

</style>
