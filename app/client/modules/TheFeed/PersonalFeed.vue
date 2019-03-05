<template>
  <div>
    <TransitionGroup name="feed-entry-list" tag="div" class="feed-entry-list">
      <PersonalFeedEntry
        v-for="entry in currentFeed"
        :key="entry._id"
        :entry="entry"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PersonalFeedEntry from './PersonalFeedEntry';

export default {
  components: {
    PersonalFeedEntry
  },
  computed: {
    ...mapGetters(['currentFeed'])
  }
};
</script>

<style scoped>
.feed-entry-list-enter,
.feed-entry-list-leave-to {
  opacity: 0;
  transform: scale(0);
}

.feed-entry-list-move {
  transition: transform var(--transition-long);
}
</style>
