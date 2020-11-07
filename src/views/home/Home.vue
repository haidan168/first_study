<template>
  <div id="app">
    <nav-bar class="nav-bar"><span slot="center">首页</span></nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

<style>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
</style>