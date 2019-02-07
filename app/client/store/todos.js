const todos = {
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || []
  },
  getters: {
    getTodoList: state => state.todos
  },
  mutations: {
    pushTodo(state, todo) {
      state.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    markCompleted(state, text) {
      const index = state.todos.findIndex(
        e => e.text === text && e.completed === false
      );
      if (index >= 0) {
        state.todos[index].completed = true;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(e => e.completed === false);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  actions: {
    createTodo({ commit }, text) {
      commit('pushTodo', { text, completed: false });
    },
    completeTodo({ commit }, text) {
      commit('markCompleted', text);
    },
    clearCompleteTodos({ commit }) {
      commit('clearCompleted');
    }
  }
};

export default todos;
