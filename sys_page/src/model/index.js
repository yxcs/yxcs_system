import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import footerStatus from './modules/footerStatus'
import defaultStore from './store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    footerStatus,
    defaultStore
  }
})
