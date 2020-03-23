import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    INCREMENT(state) {
      state.count += 1 // eslint-disable-line
    }
  },
  actions: {
    increment(cxt) {
      cxt.commit('INCREMENT')
    }
  }
})