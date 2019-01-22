<template>
  <section>
    <h3>Entries ({{ entries.length }})</h3>
    <EntryListArticle
      v-for="entry in entries"
      :key="entry.uid"
      :entry="entry"
    />
  </section>
</template>

<script>
import EntryListArticle from './EntryListArticle';

export default {
  components: {
    EntryListArticle
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
section {
  margin: var(--spacing-double);
  display: flex;
  flex-flow: row wrap;
}

h3 {
  flex: 100%;
}

/deep/ article {
  padding: var(--spacing);
  flex: 1 1 100%;
}
</style>
