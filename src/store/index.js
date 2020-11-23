import Vuex from 'vuex';
import Vue from 'vue';

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

export default store;