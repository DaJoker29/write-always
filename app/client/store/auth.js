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
    fbLogin({ dispatch }, { email, ...response }) {
      dispatch('fetchToken', { method: 'fb', email, response });
    },
    fbLogout() {
      window.FB.logout();
    },
    logout({ commit, dispatch }) {
      commit('logout');
      commit('purgeTodos');
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
