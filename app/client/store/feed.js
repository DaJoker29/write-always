import http from '@client/http-common';

const feed = {
  state: {
    feed: JSON.parse(localStorage.getItem('feed')) || []
  },
  getters: {
    currentFeed: state => state.feed
  },
  mutations: {
    updateFeed(state, payload) {
      state.feed = payload;
      localStorage.setItem('feed', JSON.stringify(payload));
    }
  },
  actions: {
    async fetchFeed({ commit }) {
      const response = await http.get('/feed');
      commit('updateFeed', response.data);
    }
  }
};

export default feed;
