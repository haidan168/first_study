<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><span slot="center">首页</span></nav-bar>
    <!-- 用于吸顶的 tab-control ，没到到要求时隐藏 -->
    <tab-control :titles="['流行','新款','精选']"
                 @typeClick="typeClick"
                 ref="tabControl1"
                 class="fix-tab-control"
                 v-show="isFixedTabControl" />
    <scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                   @typeClick="typeClick"
                   ref="tabControl2" />
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

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemImgLinsterMinIn, backTopMinin } from 'common/mixin'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemImgLinsterMinIn, backTopMinin],
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
      tabOffsetTop: 0,
      isFixedTabControl: false
    }
  },
  computed: {
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
  deactivated () {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 控制 scroll
    contentScroll (position) {
      this.linseBackTop(position);
      // 控制 tab-control 是否固定
      this.isFixedTabControl = (-position.y) > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore () {
      // 获取下一页信息
      this.getHomeGoods(this.currentType);
      // 重置上拉加载更多
      this.$refs.scroll.finishPullUp();
    },
    // 获取 tabControl 的 offsetTop
    swiperImageLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.fix-tab-control {
  position: relative;
  z-index: 10;
}
.home-content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>