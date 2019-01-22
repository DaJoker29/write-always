<template>
  <main>
    <NotebookPage v-if="notebook && notebook.owner" :notebook="notebook" />
    <h2 v-else>Loading...</h2>
  </main>
</template>

<script>
import http from '@client/http-common';
import NotebookPage from '@client/components/NotebookPage';

export default {
  components: {
    NotebookPage
  },
  data: function() {
    return {
      notebook: {}
    };
  },
  watch: {
    $route: async function(to, from) {
      this.notebook = await this.updateNotebook(to.params.notebookID);
    }
  },
  created: async function() {
    this.notebook = await this.updateNotebook(this.$route.params.notebookID);
  },
  methods: {
    updateNotebook: async function(notebookID) {
      const notebook = (await http.get(`/api/notebook/${notebookID}`)).data;
      const entries = (await this.$http.get(`/api/entries?n=${notebookID}`))
        .data;
      return Object.assign(notebook, { entries });
    }
  }
};
</script>
