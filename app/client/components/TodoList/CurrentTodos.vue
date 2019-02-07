<template>
  <div v-if="currentTodos.length" class="box-container">
    <strong>Todo:</strong>
    <TodoListItem
      v-for="(todo, index) in currentTodos"
      :key="index"
      :todo="todo"
    />
    <CreateTodo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoListItem from './TodoListItem';
import CreateTodo from './CreateTodo';

export default {
  components: {
    TodoListItem,
    CreateTodo
  },
  computed: {
    ...mapGetters(['getTodoList']),
    currentTodos() {
      return this.getTodoList.filter(e => !e.completed) || [];
    }
  }
};
</script>
