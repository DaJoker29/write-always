<template>
  <nav>
    <RouterLink v-if="isLoggedIn" to="/new-story" class="yellow">
      <i class="fa fa-edit"></i> Write Story
    </RouterLink>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>

<style scoped>
nav {
  display: flex;
  background-color: var(--color-green);
  margin: 0;
}

a {
  flex: 1;
  text-align: center;
  padding: var(--spacing) var(--spacing-double);
  margin-bottom: var(--spacing-half);
  background-color: ;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

a:hover {
  filter: invert(75%);
  cursor: pointer;
}

.yellow {
  background-color: var(--color-yellow);
}
</style>
