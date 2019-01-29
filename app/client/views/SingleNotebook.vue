<template>
  <main>
    <SingleNotebookHeader :notebook="notebook(notebookID)" />
    <EntryList :entries="entries" />
  </main>
</template>

<script>
import SingleNotebookHeader from '@client/components/SingleNotebookHeader';
import EntryList from '@client/components/EntryList';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    SingleNotebookHeader,
    EntryList
  },
  data: function() {
    return {
      entries: [],
      notebookID: this.$route.params.notebookID || ''
    };
  },
  computed: {
    ...mapGetters(['allNotebooks'])
  },
  watch: {
    $route: async function(to, from) {
      this.fetchAllNotebooks();
      this.notebookID = to.params.notebookID;
      this.entries = await this.updateEntries(to.params.notebookID);
    }
  },
  created: async function() {
    this.fetchAllNotebooks();
    this.entries = await this.updateEntries(this.$route.params.notebookID);
  },
  methods: {
    ...mapActions(['fetchAllNotebooks']),
    updateEntries: async function(notebookID) {
      return (await this.$http.get(`/entries?n=${notebookID}`)).data;
    },
    notebook(uid) {
      return this.allNotebooks.find(e => e.uid === uid);
    }
  }
};
</script>

<style scoped></style>
