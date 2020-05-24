<template>
    <div>
        <!-- 用来对input里面的数据进行校验，所以input是它的孩子 -->
        <!-- label，可以设置label是否显示 -->
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <!-- 校验信息显示 -->
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  inject: ['form'],
  /* 父组件传递过来label数据，决定是否显示labei标签 */
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
      error: '' // error是空说明校验通过
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate () {
      // 规则
      const rules = this.form.rules[this.prop]
      // 值
      const value = this.form.model[this.prop]
      // 校验描述对象
      const desc = { [this.prop]: rules }
      // 创建Schema实例
      const schema = new Schema(desc)
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
