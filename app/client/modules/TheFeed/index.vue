<template>
  <aside>
    <h3>Welcome back, {{ currentUser.displayName }}!</h3>
    <CreateFeedEntry />
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
    ...mapGetters(['currentUser'])
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
