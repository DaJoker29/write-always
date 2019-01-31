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
import { mapGetters } from 'vuex';
import EntryListArticle from './EntryListArticle';
import SortEntries from './SortEntries';

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
  data: function() {
    return {
      selectedEntries: []
    };
  },
  computed: {
    ...mapGetters(['sort']),
    allEntries: function() {
      return this.selectedEntries || [];
    }
  },
  watch: {
    entries: function() {
      this.selectedEntries = this.sortEntries(this.entries.slice()) || [];
    },
    'sort.entries.orderBy': function() {
      this.selectedEntries = this.sortEntries(this.entries.slice()) || [];
    }
  },
  methods: {
    sortEntries(entries) {
      const { orderBy } = this.sort.entries;

      if (orderBy === 'oldest') {
        return entries.sort((a, b) => {
          return this.moment(a.createdAt).diff(this.moment(b.createdAt));
        });
      } else {
        return entries.sort((a, b) => {
          return this.moment(b.createdAt).diff(this.moment(a.createdAt));
        });
      }
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
