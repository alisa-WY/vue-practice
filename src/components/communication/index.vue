<template>
    <div>
        <!-- 子组件1，父通过props传给子组件 -->
        <child1 msg="parent => child => proprs"></child1>
        <!-- 子组件2，子组件通过自定义事件给父组件传值 -->
        <child2 @add="cartAdd($event)"></child2>
        <p>{{msg2}}</p>
        <input type="text" v-model="msg2">
        <child3></child3>
    </div>
</template>

<script>
import child1 from './01-props.vue'
import child2 from './02-emit.vue'
import child3 from './03-bus.vue'
export default {
  components: {
    child1,
    child2,
    child3
  },
  data () {
    return {
      msg2: ''
    }
  },
  methods: {
    cartAdd: function (e) {
      this.msg2 = e
    }
  }
}
</script>

<style lang="">
</style>
