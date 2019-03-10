import http from '@client/http-common';
import router from '@client/router';

const fb = {
  state: {
    status: '',
    accessToken: '',
    userID: '',
    profile: {}
  },
  getters: {
    fbProfile: state => state.profile,
    fbStatus: state => state.status
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setUserID(state, payload) {
      state.userID = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    checkFBStatus({ dispatch, state, commit }) {
      window.FB.getLoginStatus(async ({ status, authResponse }) => {
        commit('setStatus', status);

        if (authResponse) {
          const { userID, accessToken } = authResponse;
          commit('setUserID', userID);
          commit('setAccessToken', accessToken);

          if (status === 'connected') {
            window.FB.api('/me', { fields: 'name, email' }, async fbUser => {
              commit('setProfile', fbUser);
              const response = await http.get(`/user?email=${fbUser.email}`);

              if (response.status === 200 && response.data) {
                dispatch('login', fbUser.email);
              } else {
                router.push('/signup');
              }
            });
          }
        }
      });
    },
    fbLogout({ dispatch }) {
      window.FB.logout(() => {
        dispatch('checkFBStatus');
        router.push('/');
      });
    },
    loginToFacebook({ dispatch, commit }) {
      window.FB.login(
        ({ authResponse }) => {
          if (authResponse) {
            window.FB.api('/me', { fields: 'name, email' }, response => {
              dispatch('checkFBStatus');
            });
          } else {
            console.log('User cancelled login or did not fully authorize');
          }
        },
        { scope: 'email' }
      );
    }
  },
  async updateFBToken({ dispatch }, payload) {
    await http.post('/user/fb', payload);
    dispatch('fetchUser');
  }
};

export default fb;
