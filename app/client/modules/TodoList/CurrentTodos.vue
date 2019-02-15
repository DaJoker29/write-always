<template>
  <div v-if="currentTodos.length" class="box-container">
    <strong>Todo:</strong>
    <TodoListItem v-for="todo in currentTodos" :key="todo._id" :todo="todo" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoListItem from './TodoListItem';

export default {
  components: {
    TodoListItem
  },
  computed: {
    ...mapGetters(['getTodoList']),
    currentTodos() {
      return this.getTodoList.filter(e => !e.isCompleted) || [];
    }
  }
};
</script>
