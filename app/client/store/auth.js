import http from '@client/http-common';
import axios from 'axios';

const auth = {
  state: {
    token: localStorage.getItem('token') || '',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {}
  },
  getters: {
    isLoggedIn: state =>
      Object.keys(state.currentUser).length !== 0 &&
      state.currentUser.constructor === Object,
    currentUser: state => state.currentUser
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    logout(state) {
      state.token = '';
      state.currentUser = {};
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    },
    updateCurrentUser(state, payload) {
      state.currentUser = payload;
      localStorage.setItem('currentUser', JSON.stringify(payload));
    }
  },
  actions: {
    async login({ commit, dispatch }, email) {
      const body = {
        method: 'dab',
        email
      };
      const token = (await axios.post('/auth/login', body)).data;

      commit('setToken', token);
      dispatch('fetchUser');
      dispatch('fetchAllNotebooks');
    },
    logout({ commit, dispatch }) {
      window.FB.logout();
      commit('logout');
      dispatch('initialFetch');
    },
    async fetchToken({ commit, dispatch }, payload) {
      commit('setToken', (await axios.post('/auth/login', payload)).data);
      dispatch('fetchUser');
      dispatch('fetchAllNotebooks');
    },
    async fetchUser({ commit, state }) {
      commit(
        'updateCurrentUser',
        (await http.post('/user/token', { token: state.token })).data
      );
    }
  }
};

export default auth;
