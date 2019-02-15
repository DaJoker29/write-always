<template>
  <section>
    <SortEntries v-if="entries.length" />
    <p v-else>No entries yet.</p>
    <TransitionGroup name="entry-list" class="entry-list" tag="div">
      <EntryListArticle
        v-for="entry in allEntries"
        :key="entry.uid"
        :entry="entry"
      />
    </TransitionGroup>
  </section>
</template>

<script>
import SortEntries from './SortEntries';
import EntryListArticle from './EntryListArticle';

export default {
  components: {
    EntryListArticle,
    SortEntries
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  computed: {
    allEntries: function() {
      return this.entries.slice() || [];
    }
  }
};
</script>

<style scoped>
.entry-list {
  margin: var(--spacing-double);
  display: flex;
  flex-flow: row wrap;
}

h3 {
  flex: 100%;
}

.entry-list-move {
  transition: transform var(--transition-long);
}
</style>
