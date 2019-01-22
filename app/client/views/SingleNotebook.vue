<template>
  <main>
    <SingleNotebookHeader v-if="notebook.owner" :notebook="notebook" />
    <EntryList :entries="entries" />
  </main>
</template>

<script>
import SingleNotebookHeader from '@client/components/SingleNotebookHeader';
import EntryList from '@client/components/EntryList';

export default {
  components: {
    SingleNotebookHeader,
    EntryList
  },
  data: function() {
    return {
      notebook: {},
      entries: []
    };
  },
  watch: {
    $route: async function(to, from) {
      this.notebook = await this.updateNotebook(to.params.notebookID);
      this.entries = await this.updateEntries(to.params.notebookID);
    }
  },
  created: async function() {
    this.notebook = await this.updateNotebook(this.$route.params.notebookID);
    this.entries = await this.updateEntries(this.$route.params.notebookID);
  },
  methods: {
    updateNotebook: async function(notebookID) {
      return (await this.$http.get(`/notebook/${notebookID}`)).data;
    },
    updateEntries: async function(notebookID) {
      return (await this.$http.get(`/entries?n=${notebookID}`)).data;
    }
  }
};
</script>

<style scoped></style>
