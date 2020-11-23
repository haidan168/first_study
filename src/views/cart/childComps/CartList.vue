<template>
  <div class="cart-list">
    <scroll class="content"
            ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

import { mapGetters } from 'vuex'
export default {
  components: {
    Scroll,
    CartListItem
  },
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    // 每次进入购物车界面，刷新 scroll，防止滚动高度不对
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>