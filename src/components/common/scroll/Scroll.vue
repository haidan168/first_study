<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: true
    })

    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position);
      this.scroll.refresh();
    })

    this.scroll.on('pullingUp', () => {
      // console.log(this.scroll);
      this.scroll.finishPullUp();
    })



  },
  methods: {
    // 返回顶部方法
    backTop (x, y, time = 400) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 刷新
    refresh () {
      this.scroll && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>
</style>