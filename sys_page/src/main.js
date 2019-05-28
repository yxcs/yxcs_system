import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './model'
import services from '@/services'
import Directive from '@/utils/directive'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = services
for(let key in Directive){
  Vue.directive(key, Directive[key]);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
