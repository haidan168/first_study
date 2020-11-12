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
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 是否可以滚动
      probeType: this.probeType,
      click: true,
      // 是否上拉加载更多
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    }
    // 监听 scroll 滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // 已经到底部，将事件发射出去
        this.$emit('pullingUp');
      })
    }



  },
  methods: {
    // 返回顶部方法
    backTop (x, y, time = 400) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 刷新
    refresh () {
      this.scroll && this.scroll.refresh();
    },
    // 重置上拉加载更多
    finishPullUp () {
      this.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>
</style>