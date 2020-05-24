export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render (h) {
    // <a href='#/about'></a>
    // <router-link to="./about">内容作为children</router-link>
    // h(tag, data, children)
    return h('a', { attrs: { href: '#' + this.to }, class: 'haha' }, this.$slots.default)
  }
}
