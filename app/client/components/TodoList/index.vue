<template>
  <div>
    <CurrentTodos />
    <CompletedTodos />
  </div>
</template>

<script>
import CurrentTodos from './CurrentTodos';
import CompletedTodos from './CompletedTodos';

export default {
  components: {
    CompletedTodos,
    CurrentTodos
  }
};
</script>
