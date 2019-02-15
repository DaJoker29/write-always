<template>
  <div v-if="completedTodos.length" class="box-container">
    <small> <a @click="clearTodos">Clear Completed</a> </small>
    <TodoListItem v-for="todo in completedTodos" :key="todo._id" :todo="todo" />
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
      return this.getTodoList.filter(e => e.isCompleted) || [];
    }
  },
  methods: {
    ...mapActions(['clearTodos'])
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
