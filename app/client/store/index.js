import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    uid: localStorage.getItem('uid') || '',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    allUsers: JSON.parse(localStorage.getItem('allUsers')) || [],
    allNotebooks: JSON.parse(localStorage.getItem('allNotebooks')) || [],
    isSearchOpen: false,
    isNavOpen: false
  },
  getters: {
    isLoggedIn: state => state.token !== '',
    isSearchOpen: state => state.isSearchOpen,
    isNavOpen: state => state.isNavOpen,
    currentUser: state => state.currentUser,
    allNotebooks: state => state.allNotebooks,
    allUsers: state => state.allUsers
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
    },
    updateCurrentUser(state, payload) {
      state.currentUser = payload;
      localStorage.setItem('currentUser', JSON.stringify(payload));
    },
    updateAllUsers(state, payload) {
      state.allUsers = payload;
      localStorage.setItem('allUsers', JSON.stringify(payload));
    },
    updateAllNotebooks(state, payload) {
      state.allNotebooks = payload;
      localStorage.setItem('allNotebooks', JSON.stringify(payload));
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
    },
    async fetchUser({ commit }) {
      commit(
        'updateCurrentUser',
        (await http.get(`/user/${localStorage.getItem('uid')}`)).data
      );
    },
    async fetchAllUsers({ commit }) {
      commit('updateAllUsers', (await http.get('/users')).data);
    },
    async fetchAllNotebooks({ commit }) {
      commit('updateAllNotebooks', (await http.get('/notebooks')).data);
    }
  }
});
