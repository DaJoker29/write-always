import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// TODO: Separate store into separate modules as data complexity grows.

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
    },
    closeNav(state) {
      state.isNavOpen = false;
    }
  },
  actions: {
    toggleSearch({ commit }) {
      commit('toggleSearch');
    },
    toggleNav({ commit }) {
      commit('toggleNav');
    },
    closeNav({ commit }) {
      commit('closeNav');
    }
  }
});
