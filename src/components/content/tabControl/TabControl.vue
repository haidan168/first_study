<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item,index) in titles"
         :class="{active: currentIndex === index}"
         :key="index"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index;
      this.$emit('typeClick', index);
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 35px;
  line-height: 35px;
  background: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
  font-weight: bold;
  border-bottom: 2px solid var(--color-high-text);
}
</style>