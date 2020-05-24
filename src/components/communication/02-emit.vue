<template>
    <div @click="$emit('add',msg)">
        <!-- 子向父传递数据 -->
        <h2>子组件2，子组件向父组件传递参数msg2</h2>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'child2-msg'
    }
  }
}
</script>

<style>

</style>
