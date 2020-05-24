<template>
    <div>
        <!-- 自定义组件双向绑定v-model实现条件：value @input -->
        <!-- v-bind="attrs"展开$attrs，把每一项添加上 -->
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
export default {
  inheritAttrs: false, // 设置为false避免设置到根元素上
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput (e) {
      // 单向数据流，监听value值，并派发出去
      this.$emit('input', e.target.value)
      // 当数据发生变化，通知父级进行校验
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>

</style>
