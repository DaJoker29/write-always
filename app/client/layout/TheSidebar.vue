<template>
  <aside>
    <h4>Welcome back, {{ currentUser.displayName }}!</h4>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
