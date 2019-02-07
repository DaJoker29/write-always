<template>
  <div>
    <input
      v-model="newTodo"
      type="text"
      placeholder="Add new task"
      @keyup.enter="submit"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: ''
    };
  },
  methods: {
    ...mapActions(['createTodo']),
    submit() {
      this.createTodo(this.newTodo);
      this.newTodo = '';
    }
  }
};
</script>

<style scoped>
input {
}
</style>
