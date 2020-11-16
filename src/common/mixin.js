import {debounce} from './utils.js';

export const itemImgLinsterMinIn = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    // 调用防抖函数，防止刷新频繁
    let refresh = debounce(this.$refs.scroll.refresh, 100);
    // 保存监听事件
    this.itemImgListener = () => {
      refresh();
    };
    // 监听事件总线中的 itemImgLoad 事件
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  }
}