import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSearchOpen: false,
    isNavOpen: false
  },
  mutations: {
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    }
  },
  actions: {
    toggleSearch({ commit }) {
      commit('toggleSearch');
    },
    toggleNav({ commit }) {
      commit('toggleNav');
    }
  }
});
