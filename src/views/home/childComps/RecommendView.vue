<template>
  <div class="recommend">
    <div class="recommend-item"
         v-for="item in recommends"
         :key="item.sort">
      <a :href="item.link">
        <img :src="item.image"
             alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style sxoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 10px;
  padding: 5px 0 10px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>