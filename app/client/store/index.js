import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    isSearchOpen: false,
    isNavOpen: false
  },
  getters: {
    isLoggedIn: state => state.username !== '' && state.token !== '',
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
    logout(state) {
      state.username = '';
      state.token = '';
      localStorage.removeItem('token');
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
    login({ commit }, { username, token }) {
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      commit('setUsername', username);
      commit('setToken', token);
    },
    logout({ commit }) {
      delete axios.defaults.headers.common['Authorization'];
      commit('logout');
    }
  }
});
