import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

/* 
import {request} from './network/request.js'

request({
  url: '/home/multidata'
}).then( res => {
  console.log(res);
}).catch(err => {
  console.log(err);
}) */