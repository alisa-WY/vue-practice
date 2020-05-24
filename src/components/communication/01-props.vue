<template>
    <div>
        <!-- 父给子传值 -->
        <h2>子组件1，接收父给子传递的参数msg</h2>
        <!-- 如果父传递过来数据就呈现出来 -->
        <p>{{msg}}</p>
        <!-- 如果没有传递过来使用默认值 -->
        <p>{{defa}}</p>
        <p>{{msg1}}</p>
        <p>{{msg3}}</p>
    </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    },
    defa: {
      type: String,
      default: '没有传递则显示默认值'
    }
  },
  data () {
    return {
      msg1: this.msg.toUpperCase() + '作为一个本地的数据流进行使用',
      msg3: ''
    }
  },
  mounted () {
    this.$bus.$on('event-bus', (msg) => {
      this.msg3 = msg
    })
  }
}
</script>

<style>
</style>
