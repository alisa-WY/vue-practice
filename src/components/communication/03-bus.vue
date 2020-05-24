<template>
    <div>
        <!-- bus:任意两个组件之间传值常用事件总线 -->
        <h2>子组件3，BUS=>任意两个组件之间传值,此处传递给child1</h2>
        <div @click="eventbus">03-组件</div>
    </div>
</template>

<script>
export default {
  methods: {
    eventbus: function () {
      this.$bus.$emit('event-bus', 'this is bus from child3')
      console.log(this.$parent)
    }
  }
}
</script>

<style>

</style>
