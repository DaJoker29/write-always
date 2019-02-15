<template>
  <div>
    <CurrentTodos />
    <CreateTodo />
    <CompletedTodos />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrentTodos from './CurrentTodos';
import CompletedTodos from './CompletedTodos';
import CreateTodo from './CreateTodo';

export default {
  components: {
    CompletedTodos,
    CurrentTodos,
    CreateTodo
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(['fetchTodos'])
  }
};
</script>
