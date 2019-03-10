import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';
import ui from './ui';
import auth from './auth';
import feed from './feed';
import story from './story';
import fb from './fb';
import sort, { sortUsers } from './sort';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fb,
    story,
    feed,
    auth,
    ui,
    sort
  },
  state: {
    config: process.env.SITE_CONFIG,
    allUsers: JSON.parse(localStorage.getItem('allUsers')) || []
  },
  getters: {
    config: state => state.config,
    allUsers: state => sortUsers(state)
  },
  mutations: {
    updateAllUsers(state, payload) {
      state.allUsers = payload;
      localStorage.setItem('allUsers', JSON.stringify(payload));
    }
  },
  actions: {
    initialFetch({ dispatch }) {
      dispatch('fetchFeed');
      dispatch('fetchStories');
    },
    async fetchAllUsers({ commit }) {
      commit('updateAllUsers', (await http.get('/users')).data);
    }
  }
});
