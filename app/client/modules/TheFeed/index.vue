<template>
  <aside>
    <div v-if="isLoggedIn">
      <h3>Welcome back, {{ currentUser.displayName }}!</h3>
      <CreateFeedEntry v-if="isLoggedIn" />
    </div>
    <div v-else>
      <h3>Howdy!</h3>
      <FacebookLogin />
    </div>
    <PersonalFeed />
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    CreateFeedEntry: () => import('./CreateFeedEntry'),
    PersonalFeed: () => import('./PersonalFeed'),
    FacebookLogin: () => import('@client/modules/FacebookLogin')
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
  padding: var(--spacing);
}
</style>
