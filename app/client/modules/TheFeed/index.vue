<template>
  <aside>
    <h3 v-if="isLoggedIn">Welcome back, {{ currentUser.displayName }}!</h3>
    <h3 v-else>Howdy!</h3>
    <CreateFeedEntry v-if="isLoggedIn" />
    <PersonalFeed />
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateFeedEntry from './CreateFeedEntry';
import PersonalFeed from './PersonalFeed';

export default {
  components: {
    CreateFeedEntry,
    PersonalFeed
  },
  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn'])
  }
};
</script>

<style scoped>
aside {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing) 0;
}
</style>
