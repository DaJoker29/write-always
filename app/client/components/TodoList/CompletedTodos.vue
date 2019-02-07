<template>
  <div v-if="completedTodos.length" class="box-container">
    <small> <a @click="clearCompleteTodos">Clear Completed</a> </small>
    <TodoListItem
      v-for="(todo, index) in completedTodos"
      :key="index"
      :todo="todo"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoListItem from './TodoListItem';

export default {
  components: {
    TodoListItem
  },
  computed: {
    ...mapGetters(['getTodoList']),
    completedTodos() {
      return this.getTodoList.filter(e => e.completed) || [];
    }
  },
  methods: {
    ...mapActions(['clearCompleteTodos'])
  }
};
</script>

<style scoped>
a {
  text-decoration: underline;
  font-style: italic;
  cursor: pointer;
}
</style>
