<template>
  <div class="cart">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import { mapGetters } from 'vuex'
export default {
  components: { NavBar },
  name: 'Cart',
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.cart {
  background: var(--color-tint);
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>