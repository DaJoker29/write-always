<template>
  <aside>
    <h4>Welcome back, {{ currentUser.displayName }}!</h4>
    <TodoList />
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoList from '@client/modules/TodoList';

export default {
  components: {
    TodoList
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
};
</script>

<style scoped>
aside {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing);
}
</style>
