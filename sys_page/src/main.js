import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './model'
import services from '@/services'
import Directive from '@/utils/directive'

Vue.config.productionTip = false
Vue.prototype.$http = services
for(let key in Directive){
  Vue.directive(key, Directive[key]);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
