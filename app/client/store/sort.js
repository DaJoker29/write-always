import moment from 'moment';

const sort = {
  state: {
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

export { sortEntries, sortNotebooks, sortUsers };

function dateCompare(a, b) {
  return moment(a).diff(moment(b));
}

function sortEntries(state) {
  const { sort } = state.sort;
  const { orderBy } = sort.entries;

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
  const { sort } = state.sort;
  const { orderBy } = sort.notebooks;

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
