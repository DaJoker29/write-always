<template>
  <TransitionGroup name="story-list" tag="div" class="story-list">
    <Story v-for="story in recentStories" :key="story._id" :story="story" />
  </TransitionGroup>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    Story: () => import('./Story')
  },
  computed: {
    ...mapGetters(['recentStories'])
  }
};
</script>

<style scoped>
.story-list {
  padding: var(--spacing);
  display: flex;
  flex-flow: row wrap;
}

.story-list-move {
  transition: transform var(--transition-long);
}
</style>
