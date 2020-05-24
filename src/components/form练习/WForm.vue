<template>
    <div>
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
  provide () {
    return {
      form: this
    }
  },
  /* 接收数据和校验规则 */
  /* 把接收到数据和校验规则分发下去 */
  props: {
    model: {
      type: Object,
      requtred: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate (cb) {
      // 获取组件所有的formlist,然后过滤一下，取出需要验证的list，并传递给formitem进行验证
      // task是数组里面放着所有的校验结果
      const tasks = this.$children
        .filter(item => item.prop)
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
