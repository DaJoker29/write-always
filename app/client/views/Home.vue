<template>
  <main>
    <ActiveUserList />
    <StoryFeed />
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  components: {
    StoryFeed: () => import('@client/modules/StoryFeed'),
    ActiveUserList: () => import('@client/modules/ActiveUserList')
  },
  watch: {
    $route() {
      this.initialFetch();
    }
  },
  created: async function() {
    this.initialFetch();
  },
  methods: {
    ...mapActions(['initialFetch'])
  }
};
</script>
