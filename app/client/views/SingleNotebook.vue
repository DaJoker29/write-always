<template>
  <NotebookPage :notebook="notebook" />
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
      return notebook;
    }
  }
};
</script>
