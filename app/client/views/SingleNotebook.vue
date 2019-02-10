<template>
  <main>
    <SingleNotebookHeader :notebook="notebook(notebookID)" />
    <EntryList :entries="entries" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    SingleNotebookHeader: () =>
      import('@client/components/SingleNotebookHeader'),
    EntryList: () => import('@client/components/EntryList')
  },
  computed: {
    ...mapGetters(['allNotebooks', 'allEntries']),
    entries() {
      if (this.notebookID) {
        return this.allEntries[this.notebookID] || [];
      }
      return [];
    },
    notebookID() {
      return this.$route.params.notebookID || '';
    }
  },
  watch: {
    $route() {
      this.fetchNotebookEntries(this.notebookID);
    }
  },
  created() {
    this.fetchNotebookEntries(this.notebookID);
  },
  methods: {
    ...mapActions(['fetchNotebookEntries']),
    notebook(uid) {
      return this.allNotebooks.find(e => e.uid === uid);
    }
  }
};
</script>

<style scoped></style>
