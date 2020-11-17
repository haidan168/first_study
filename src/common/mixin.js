import {debounce} from './utils.js';
import BackTop from 'components/content/backTop/BackTop'

export const itemImgLinsterMinIn = {
  data() {
    return{
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // 调用防抖函数，防止刷新频繁
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    // 保存监听事件
    this.itemImgListener = () => {
      this.refresh();
    };
    // 监听事件总线中的 itemImgLoad 事件
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  }
}

export const backTopMinin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 点击返回顶部
    backTopClick () {
      this.$refs.scroll.backTop(0, 0);
    },
    // 控制 BackTop 按钮的显示
    linseBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000;
    }
  }
}