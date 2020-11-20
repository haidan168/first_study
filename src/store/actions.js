import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context,payload) {
    // 查找是否存在该商品
    let oldProduct = context.state.cartList.find(item => {
      return item.iid === payload.iid;
    })
    if(oldProduct) {
      // 如果存在 count +1
      context.commit(ADD_COUNT,oldProduct);
    }else {
      // 不存在添加新属性 count 并赋值为 1，添加到数组中
      payload.count = 1;
      context.commit(ADD_TO_CART,payload);
    }
  }
}