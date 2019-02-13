const ui = {
  state: {
    isSearchOpen: false,
    isNavOpen: false
  },
  getters: {
    isSearchOpen: state => state.isSearchOpen,
    isNavOpen: state => state.isNavOpen
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
    }
  }
};

export default ui;
