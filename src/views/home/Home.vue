<template>
  <div id="home">
    <nav-bar class="nav-bar"><span slot="center">首页</span></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @typeClick="typeClick" />
      <goods-list :goods="realType" />
    </scroll>
    <back-top @click.native="backTopClick"
              v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import { getHomeMultidata, getHomeGoods } from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  }, computed: {
    realType () {
      return this.goods[this.currentType].list;
    }
  },
  created () {
    this.getHomeMultidata();

    // 在创建的时候，就请求3种分类的第一页数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted () {
    // 监听事件总线中的 itemImgLoad 事件
    this.$bus.$on('itemImgLoad', () => {
      console.log("---");
      this.$refs.scroll.refresh();
    });
  },
  methods: {
    /**
     * 事件监听
     */
    // 点击显示不同分类的内容
    typeClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    // 点击返回顶部
    backTopClick () {
      this.$refs.scroll.backTop(0, 0);
    },
    // 控制 BackTop 按钮的显示
    contentScroll (position) {
      this.isShowBackTop = (-position.y) > 1000;
    },

    /**
     *  网络请求
     */
    // 请求分类栏上面的数据
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    // 请求分类栏下面的数据
    getHomeGoods (type) {
      // 获取当前类型的页数
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 将请求的数据添加的数组中
        this.goods[type].list.push(...res.data.list);
        // 数据添加完成，改变改类型的页数
        this.goods[type].page = page;
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: bold;
  font-size: 18px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
.content {
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>