<template>
  <section>
    <SortEntries />
    <EntryListArticle
      v-for="entry in allEntries"
      :key="entry.uid"
      :entry="entry"
    />
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
