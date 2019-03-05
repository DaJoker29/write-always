import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';
import ui from './ui';
import auth from './auth';
import feed from './feed';
import sort, { sortEntries, sortNotebooks, sortUsers } from './sort';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feed,
    auth,
    ui,
    sort
  },
  state: {
    config: process.env.SITE_CONFIG,
    allUsers: JSON.parse(localStorage.getItem('allUsers')) || [],
    allNotebooks: JSON.parse(localStorage.getItem('allNotebooks')) || [],
    allEntries: JSON.parse(localStorage.getItem('allEntries')) || []
  },
  getters: {
    config: state => state.config,
    allNotebooks: state => sortNotebooks(state),
    allUsers: state => sortUsers(state),
    allEntries: state => sortEntries(state)
  },
  mutations: {
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
    initialFetch({ dispatch }) {
      dispatch('fetchAllNotebooks');
      dispatch('fetchFeed');
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
    async fetchAllUsers({ commit }) {
      commit('updateAllUsers', (await http.get('/users')).data);
    },
    async fetchAllNotebooks({ dispatch, commit }) {
      commit('updateAllNotebooks', (await http.get('/notebooks')).data);
      dispatch('fetchRecentEntries');
    }
  }
});
