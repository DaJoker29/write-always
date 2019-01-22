import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    uid: localStorage.getItem('uid') || '',
    isSearchOpen: false,
    isNavOpen: false
  },
  getters: {
    isLoggedIn: state =>
      state.username !== '' && state.token !== '' && state.uid !== '',
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
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    setUID(state, payload) {
      state.uid = payload;
      localStorage.setItem('uid', payload);
    },
    logout(state) {
      state.username = '';
      state.token = '';
      state.uid = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('uid');
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
    login({ commit }, { username, token, uid }) {
      commit('setUsername', username);
      commit('setToken', token);
      commit('setUID', uid);
    },
    logout({ commit }) {
      commit('logout');
    }
  }
});
