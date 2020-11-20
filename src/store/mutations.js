import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-types'

export default {
  // 数量增加
  [ADD_COUNT](state,payload) {
    payload.count++;
  },
  // 添加到购物车
  [ADD_TO_CART](state,payload) {
    state.cartList.push(payload);
  }
}