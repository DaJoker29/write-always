import moment from 'moment';

const sort = {
  state: {
    sort: {
      authors: {
        orderBy: 'joined'
      }
    }
  },
  getters: {
    sort: state => state.sort
  },
  mutations: {
    updateSort(state, payload) {
      const { type, order } = payload;
      if (order) {
        state.sort[type].orderBy = order;
      }
    }
  },
  actions: {
    setSort({ commit }, payload) {
      commit('updateSort', payload);
    }
  }
};

export default sort;

export { sortUsers };

function dateCompare(a, b) {
  return moment(a).diff(moment(b));
}

function sortUsers(state) {
  const { sort } = state.sort;
  const { orderBy } = sort.authors;

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
