import Vue from 'vue';
import Vuex from 'vuex';
import http from '@client/http-common';
import moment from 'moment';

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
    isNavOpen: false,
    sort: {
      authors: {
        orderBy: 'date'
      },
      notebooks: {
        orderBy: 'date',
        filter: ''
      },
      entries: {
        orderBy: 'newest',
        filter: ''
      }
    }
  },
  getters: {
    sort: state => state.sort,
    isLoggedIn: state => state.token !== '',
    isSearchOpen: state => state.isSearchOpen,
    isNavOpen: state => state.isNavOpen,
    currentUser: state => state.currentUser,
    allNotebooks: state => sortNotebooks(state),
    allUsers: state => sortUsers(state)
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
    },
    updateSort(state, payload) {
      const { type, order, filter } = payload;
      if (order) {
        state.sort[type].orderBy = order;
      }

      if (filter) {
        state.sort[type].filter = filter;
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
    login({ commit }, { username, token, uid }) {
      commit('setUsername', username);
      commit('setToken', token);
      commit('setUID', uid);
    },
    logout({ commit }) {
      commit('logout');
    },
    setSort({ commit }, payload) {
      commit('updateSort', payload);
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

function dateCompare(a, b) {
  return moment(a).diff(moment(b));
}

function sortNotebooks(state) {
  const { orderBy } = state.sort.notebooks;
  // const notebooks = state.allNotebooks;

  if (orderBy === 'date') {
    state.allNotebooks.sort((a, b) => dateCompare(a.createdAt, b.createdAt));
  } else if (orderBy === 'alphabetical') {
    state.allNotebooks.sort((a, b) => {
      return textCompare(a.title, b.title);
    });
  } else if (orderBy === 'recent') {
    state.allNotebooks.sort((a, b) => dateCompare(b.updatedAt, a.updatedAt));
  }
  return state.allNotebooks;
}

function sortUsers(state) {
  const { orderBy } = state.sort.authors;

  if (orderBy === 'date') {
    state.allUsers.sort((a, b) => dateCompare(a.dateJoined, b.dateJoined));
  } else if (orderBy === 'alphabetical') {
    state.allUsers.sort((a, b) => {
      return textCompare(a.displayName, b.displayName);
    });
  } else if (orderBy === 'recent') {
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
