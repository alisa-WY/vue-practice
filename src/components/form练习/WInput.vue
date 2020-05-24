<template>
    <div>
        <!-- 实现数据双向绑定，v-model:v-bind:value和v-on -->
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
export default {
  /* 禁止继承到父级元素 */
  inheritAttrs: false,
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
      // 当数值发生改变时，派发一个input事件
      this.$emit('input', e.target.value)
      // 当数据发生变化时触发一次验证,通知父元素进行验证
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>

</style>
