const state = {
  navType: 'home',
  isFixed: false,
  user: {}
}
const getters = {
  getNavType (state) {
    return state.navType
  },
  getFooterFixed (state) {
    return state.isFixed
  },
  getUser (state) {
    return state.user
  }
}
const mutations = {
  setNavType (state, type) {
    state.navType = type
  },
  setFooterFixed (state, type) {
    // this.$store.commit('global/setNavType', 'front')
    const wrap = document.querySelector('.layout__wrap')
    if (wrap.clientHeight > document.body.clientHeight) {
      state.isFixed = false
    }
  },
  setUser (state, user) {
    state.user = user
  }
}
const actions = {
  asyncSetType (context, item) {
    context.commit('setNavType', item)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
