import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('username') || '',
    isSearchOpen: false,
    isNavOpen: false
  },
  getters: {
    isLoggedIn: state => state.username !== '',
    isSearchOpen: state => state.isSearchOpen,
    isNavOpen: state => state.isNavOpen
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
    },
    setUsername(state, payload) {
      state.username = payload;
      localStorage.setItem('username', payload);
    },
    logout(state) {
      state.username = '';
      localStorage.removeItem('username');
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
    },
    login({ commit }, { username }) {
      commit('setUsername', username);
    },
    logout({ commit }) {
      commit('logout');
    }
  }
});
