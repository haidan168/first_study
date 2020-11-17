<template>
  <div class="detail">
    <detail-nav-bar ref="detailNavBar"
                    @titleClick="titleClick" />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad" />
      <detail-param-info ref="param"
                         :param-info="paramInfo" />
      <detail-comment-info ref="comment"
                           :commentInfo="commentInfo" />
      <goods-list ref="recommend"
                  :goods="recommends" />
    </scroll>
    <back-top @click.native="backTopClick"
              v-show="isShowBackTop" />
    <detail-bottom-bar />
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
import { itemImgLinsterMinIn, backTopMinin } from 'common/mixin'
export default {
  name: 'Detail',
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  mixins: [itemImgLinsterMinIn, backTopMinin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    }
  },
  created () {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 通过 iid 请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取 topImages 数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品的详细信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 获取评论信息，判断是否有评论
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取评论数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })
  },
  destroyed () {
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods: {
    // 图片加载完成后进行刷新
    imageLoad () {
      // this.$refs.scroll.refresh();
      this.refresh();
      // 图片加载完成后，获取每个主题的参数 
      this.themeTopYs.push(0);
      // 需要减去 nav-bar 的高度 44
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // 用于标题栏的显示
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    // 点击标题，跳转到相应的位置
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听滚动的位置，改变标题的状态
    contentScroll (position) {
      // console.log(position);
      const positionY = -position.y;
      const length = this.themeTopYs.length - 1;
      /* for (let i = 0; i < length; i++) {
        if (i !== this.currentIndex && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      } */
      // 空间换时间
      for (let i = 0; i < length; i++) {
        if (i !== this.currentIndex && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      }

      this.linseBackTop(position);
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>