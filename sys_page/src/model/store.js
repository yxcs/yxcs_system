import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  showFooter: true,
  changableNum: 0
};
const getters = {
  isShow(state) {
    return state.showFooter
  },
  getChangedNum() {
    return state.changableNum
  }
};
const mutations = {
  show(state) {
    state.showFooter = true
  },
  hide(state) {
    state.showFooter = false
  },
  newNum(state, sum) {
    state.changableNum += sum
  }
};
const actions = {
  hideFooter(context) {
    context.commit('hide')
  },
  showFooter(context) {
    context.commit('show')
  },
  getNewNum(context, num) {
    context.commit('newNum', num)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
