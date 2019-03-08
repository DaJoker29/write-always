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
    fbProfile: state => state.profile
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
            // Fetch user with matching userID
            window.FB.api('/me', { fields: 'name, email' }, async fbUser => {
              commit('setProfile', fbUser);
              // If no user exists or username doesn't exist, launch sign up flow.
              const user = await http.get(`/user?email=${fbUser.email}`);
              if (user && user.username) {
                // User logged in as normal. Retrieve Token.
              } else {
                // Put user through sign up flow
                router.push('/signup');
              }
            });
          }
        }

        // if (authResponse && status === 'connected' && state.token) {
        //   // User authenticated through Facebook and ready to roll
        //   const { userID: fbUserID, accessToken: fbUserAccess } = authResponse;
        //   dispatch('updateFBToken', { fbUserID, fbUserAccess });
        // } else if (
        //   status === 'authorization_expired' ||
        //   status === 'not_authorized'
        // ) {
        //   // Problem with facebook authorization. :'(
        //   dispatch('fbLogout');
        //   dispatch('logout');
        // } else {
        //   // What's facebook?
        //   dispatch('logout');
        // }
      });
    },
    fbLogin({ dispatch }, { email, ...response }) {
      dispatch('fetchToken', { method: 'fb', email, response });
    },
    fbLogout() {
      window.FB.logout();
    },
    loginToFacebook({ dispatch, commit }) {
      window.FB.login(
        ({ authResponse }) => {
          if (authResponse) {
            window.FB.api('/me', { fields: 'name, email' }, response => {
              commit('setProfile', response);
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
    }
  },
  async updateFBToken({ dispatch }, payload) {
    await http.post('/user/fb', payload);
    dispatch('fetchUser');
  }
};

export default fb;
