<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'

// 辅助函数，将 store 中的 getter 映射到局部计算属性
import { mapGetters } from 'vuex'
export default {
  components: {
    NavBar,
    CartList
  },
  name: 'Cart',
  computed: {
    // 使用对象展开运算符
    //...mapGetters(['cartLength', 'cartList'])
    // 使用对象形式，给 getter 另取一个名称
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>