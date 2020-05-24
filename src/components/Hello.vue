<template>
    <div>
        <!-- 新增特性 -->
        <p><input type="text" @keydown.enter="addFeature"></p>
        <p>{{count}}</p>
        <!-- ts特性列表 -->
        <ul>
            <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Feature } from '../types/index'

/* 装饰器 */
@Component({
  computed: {
    // 也可以用
  }
})
export default class Hello extends Vue {
  // 属性就是data
  features: Feature[] = []
  /* (e: KeyboardEvent)事件为键盘事件 */
  /* 函数直接作为回调 */
  addFeature (e: KeyboardEvent) {
    /* target类型EventTarget */
    /* 断言类型 */
    const inp = e.target as HTMLInputElement
    this.features.push({ id: this.features.length + 1, name: inp.value })
    inp.value = ''
  }

  // 如果和生命周期钩子同名，就是生命周期
  created () {
    this.features = [{ id: 1, name: ' 类型注解 ' }]
  }

  // 存取器用于计算属性,computed计算属性
  get count () {
    return this.features.length
  }
}

</script>

<style scoped>

</style>
