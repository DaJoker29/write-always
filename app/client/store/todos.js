import http from '@client/http-common';

const todos = {
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || []
  },
  getters: {
    getTodoList: state => state.todos
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      commit('setTodos', (await http.get('/user/todos')).data || []);
    },
    async createTodo({ dispatch }, text) {
      const { status } = await http.post('/user/todos/create', { text });

      if (status === 200) {
        dispatch('fetchTodos');
      }
    },
    async completeTodo({ dispatch }, id) {
      const { status } = await http.post('/user/todos/complete', {
        todoID: id
      });

      if (status === 200) {
        dispatch('fetchTodos');
      }
    },
    async clearTodos({ dispatch }) {
      const { status } = await http.post('/user/todos/clear');

      if (status === 200) {
        dispatch('fetchTodos');
      }
    }
  }
};

export default todos;
