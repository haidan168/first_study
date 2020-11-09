<template>
  <div id="app">
    <nav-bar class="nav-bar"><span slot="center">首页</span></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import { getHomeMultidata } from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  created () {
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
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