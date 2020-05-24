<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- 给input一个插槽 -->
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    /* 收到input值发生改变发送的验证请求 */
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate () {
      // 获取规则
      const rules = this.form.rules[this.prop]
      // 获取对象
      const value = this.form.model[this.prop]
      // 校验描述对象
      const desc = { [this.prop]: rules }
      // 创建schema实例
      const schema = new Schema(desc)
      // 进行校验
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          // 校验通过
          this.error = ''
        }
      })
    }
  }
}
</script>

<style>

</style>
