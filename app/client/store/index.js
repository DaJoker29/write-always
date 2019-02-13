import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';
import axios from 'axios';
import todos from './todos';
import ui from './ui';
import sort, { sortEntries, sortNotebooks, sortUsers } from './sort';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    sort,
    todos
  },
  state: {
    config: process.env.SITE_CONFIG,
    token: localStorage.getItem('token') || '',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    allUsers: JSON.parse(localStorage.getItem('allUsers')) || [],
    allNotebooks: JSON.parse(localStorage.getItem('allNotebooks')) || [],
    allEntries: JSON.parse(localStorage.getItem('allEntries')) || []
  },
  getters: {
    config: state => state.config,
    isLoggedIn: state =>
      Object.keys(state.currentUser).length !== 0 &&
      state.currentUser.constructor === Object,

    currentUser: state => state.currentUser,
    allNotebooks: state => sortNotebooks(state),
    allUsers: state => sortUsers(state),
    allEntries: state => sortEntries(state)
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    logout(state) {
      state.token = '';
      state.currentUser = {};
      state.todos.todos = [];
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('todos');
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
    },
    updateRecentEntries(state, payload) {
      state.recentEntries = payload;
      localStorage.setItem('recentEntries', JSON.stringify(payload));
    },
    setAllEntries(state, payload) {
      state.allEntries = payload;
      localStorage.setItem('allEntries', JSON.stringify(payload));
    }
  },
  actions: {
    fbLogin({ dispatch }, { email, ...response }) {
      dispatch('fetchToken', { method: 'fb', email, response });
    },
    fbLogout() {
      window.FB.logout();
    },
    logout({ commit, dispatch }) {
      commit('logout');
      dispatch('initialFetch');
    },
    async updateFBToken({ dispatch }, payload) {
      await http.post('/user/fb', payload);
      dispatch('fetchUser');
    },
    loginToFacebook({ dispatch }) {
      window.FB.login(
        ({ authResponse }) => {
          if (authResponse) {
            window.FB.api('/me', { fields: 'name, email' }, response => {
              const { name: displayName, id: fbUserID, email } = response;
              const { accessToken: fbUserAccess } = authResponse;

              const payload = {
                email,
                displayName,
                fbUserID,
                fbUserAccess
              };

              dispatch('fbLogin', payload);
            });
          } else {
            console.log('User cancelled login or did not fully authorize');
          }
        },
        { scope: 'email' }
      );
    },
    checkFBStatus({ dispatch, state }) {
      window.FB.getLoginStatus(({ status, authResponse }) => {
        if (authResponse && status === 'connected' && state.token) {
          // User authenticated through Facebook and ready to roll
          const { userID: fbUserID, accessToken: fbUserAccess } = authResponse;
          dispatch('updateFBToken', { fbUserID, fbUserAccess });
        } else if (
          status === 'authorization_expired' ||
          status === 'not_authorized'
        ) {
          // Problem with facebook authorization. :'(
          dispatch('fbLogout');
          dispatch('logout');
        } else {
          // What's facebook?
          dispatch('logout');
        }
      });
    },
    initialFetch({ dispatch }) {
      dispatch('fetchAllNotebooks');
    },
    pushNewEntries({ commit, state }, payload) {
      if (payload.length) {
        const a = state.allEntries.slice();

        const result = a.concat(payload).reduce((acc, cur) => {
          if (acc.findIndex(e => e.uid === cur.uid) === -1) {
            acc.push(cur);
          }
          return acc;
        }, []);

        commit('setAllEntries', result);
      }
    },
    async fetchNotebookEntries({ dispatch }, payload) {
      dispatch('pushNewEntries', (await http.get(`/entries/${payload}`)).data);
    },
    async fetchRecentEntries({ dispatch, state }) {
      dispatch(
        'pushNewEntries',
        (await http.post('/entries/recent', {
          notebooks: state.allNotebooks.map(e => e._id)
        })).data
      );
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
    },
    async fetchAllUsers({ commit }) {
      commit('updateAllUsers', (await http.get('/users')).data);
    },
    async fetchAllNotebooks({ dispatch, commit }) {
      commit('updateAllNotebooks', (await http.get('/notebooks')).data);
      dispatch('fetchRecentEntries');
    }
  }
});
