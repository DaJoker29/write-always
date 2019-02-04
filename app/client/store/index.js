import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';
import axios from 'axios';
import moment from 'moment';
import merge from 'deepmerge';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    token: localStorage.getItem('token') || '',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    allUsers: JSON.parse(localStorage.getItem('allUsers')) || [],
    allNotebooks: JSON.parse(localStorage.getItem('allNotebooks')) || [],
    allEntries: JSON.parse(localStorage.getItem('allEntries')) || [],
    isSearchOpen: false,
    isNavOpen: false,
    sort: {
      authors: {
        orderBy: 'joined'
      },
      notebooks: {
        orderBy: 'updated'
      },
      entries: {
        orderBy: 'newest'
      }
    }
  },
  getters: {
    config: state => state.config,
    sort: state => state.sort,
    isLoggedIn: state =>
      Object.keys(state.currentUser).length !== 0 &&
      state.currentUser.constructor === Object,
    isSearchOpen: state => state.isSearchOpen,
    isNavOpen: state => state.isNavOpen,
    currentUser: state => state.currentUser,
    allNotebooks: state => sortNotebooks(state),
    allUsers: state => sortUsers(state),
    allEntries: state => sortEntries(state)
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
    },
    updateSort(state, payload) {
      const { type, order } = payload;
      if (order) {
        state.sort[type].orderBy = order;
      }
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
    fbLogin({ dispatch }, { email, ...response }) {
      dispatch('fetchToken', { method: 'fb', email, response });
    },
    logout({ commit, dispatch }) {
      window.FB.logout();
      commit('logout');
      dispatch('fetchAllNotebooks');
    },
    setSort({ commit }, payload) {
      commit('updateSort', payload);
    },
    async updateFBToken({ dispatch }, payload) {
      await http.post('/user/fb', payload);
      dispatch('fetchUser');
    },
    loginToFacebook({ dispatch }) {
      window.FB.login(
        loginResponse => {
          if (loginResponse.authResponse) {
            window.FB.api('/me', { fields: 'name, email' }, response => {
              const payload = merge.all([
                JSON.parse(JSON.stringify(loginResponse.authResponse)),
                JSON.parse(JSON.stringify(response))
              ]);
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
      window.FB.getLoginStatus(
        ({ status, authResponse: { userID, accessToken } }) => {
          if (status === 'connected') {
            if (state.token) {
              dispatch('updateFBToken', { userID, accessToken });
            }
          } else if (status === 'authorization_expired') {
            console.log('authorization_expired');
            dispatch('logout');
          } else if (status === 'not_authorized') {
            console.log('not_authorized');
            dispatch('logout');
          } else {
            dispatch('logout');
          }
        }
      );
    },
    initialFetch({ dispatch }) {
      dispatch('fetchAllNotebooks');
      dispatch('fetchRecentEntries');
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
    async fetchAllNotebooks({ commit }) {
      commit('updateAllNotebooks', (await http.get('/notebooks')).data);
    }
  }
});

function dateCompare(a, b) {
  return moment(a).diff(moment(b));
}

function sortEntries(state) {
  const { orderBy } = state.sort.entries;

  // Map entries into object
  const entries = state.allEntries.reduce(function(acc, cur) {
    const key = cur.notebook.uid;

    if (Object.keys(acc).indexOf(key) === -1) {
      acc[key] = [cur];
    } else {
      acc[key].push(cur);
    }
    return acc;
  }, {});

  // Sort arrays of entries
  Object.keys(entries).forEach(key => {
    if (orderBy === 'oldest') {
      entries[key].sort((a, b) => dateCompare(a.createdAt, b.createdAt));
    } else {
      entries[key].sort((a, b) => dateCompare(b.createdAt, a.createdAt));
    }
  });

  return entries;
}

function sortNotebooks(state) {
  const { orderBy } = state.sort.notebooks;

  if (orderBy === 'oldest') {
    state.allNotebooks.sort((a, b) => dateCompare(a.createdAt, b.createdAt));
  } else if (orderBy === 'newest') {
    state.allNotebooks.sort((a, b) => dateCompare(b.createdAt, a.createdAt));
  } else if (orderBy === 'alphabetical') {
    state.allNotebooks.sort((a, b) => {
      return textCompare(a.title, b.title);
    });
  } else if (orderBy === 'updated') {
    state.allNotebooks.sort((a, b) => dateCompare(b.updatedAt, a.updatedAt));
  }
  return state.allNotebooks;
}

function sortUsers(state) {
  const { orderBy } = state.sort.authors;

  if (orderBy === 'joined') {
    state.allUsers.sort((a, b) => dateCompare(a.dateJoined, b.dateJoined));
  } else if (orderBy === 'alphabetical') {
    state.allUsers.sort((a, b) => {
      return textCompare(a.displayName, b.displayName);
    });
  } else if (orderBy === 'active') {
    state.allUsers.sort((a, b) =>
      dateCompare(b.dateLastLogin, a.dateLastLogin)
    );
  }
  return state.allUsers;
}

function textCompare(a, b) {
  const first = a.trim().toUpperCase();
  const second = b.trim().toUpperCase();
  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }
  return 0;
}
