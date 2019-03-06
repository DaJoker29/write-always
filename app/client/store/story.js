import http from '@client/http-common';

const story = {
  state: {
    stories: JSON.parse(localStorage.getItem('stories')) || []
  },
  getters: {
    recentStories: state => state.stories
  },
  mutations: {
    updateStories(state, payload) {
      state.stories = payload;
      localStorage.setItem('stories', JSON.stringify(payload));
    }
  },
  actions: {
    async fetchStories({ commit }) {
      const response = await http.get('/stories');
      commit('updateStories', response.data);
    }
  }
};

export default story;
