<template>
  <div class="tab-bar"
       :style="tabBarStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    tabBarColor: {
      type: String,
      default: '#eee'
    }
  },
  computed: {
    tabBarStyle () {
      return { backgroundColor: this.tabBarColor };
    }
  }
}
</script>

<style>
.tab-bar {
  display: flex;
  /* background-color: #eee; */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
</style>