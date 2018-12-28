import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSearchOpen: false
  },
  mutations: {
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    }
  },
  actions: {
    toggleSearch({ commit }) {
      commit('toggleSearch');
    }
  }
});
