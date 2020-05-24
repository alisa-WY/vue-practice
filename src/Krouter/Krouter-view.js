export default {
  render (h) {
    //   let component = null
    // 对下面优化的
    const { routeMap, current } = this.$router
    const component = routeMap[current].component || null
    return h(component)

    // 对下面进行优化，因为下面每次运行都要重新遍历
    //   this.$router.$options.routes.forEach(route => {
    //     if (route.path === this.$router.current) {
    //       component = route.component
    //     }
    //   })
    //   return h(component)
  }
}
