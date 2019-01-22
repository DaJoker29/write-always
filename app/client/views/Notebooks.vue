<template>
  <main><NotebookList :notebooks="notebooks" /></main>
</template>

<script>
import NotebookList from '@client/components/NotebookList';
import http from '@client/http-common';

export default {
  components: {
    NotebookList
  },
  data: function() {
    return {
      notebooks: []
    };
  },
  created: async function() {
    this.notebooks = await this.fetchNotebooks();
  },
  methods: {
    fetchNotebooks: async function() {
      return (await http.get('/api/notebooks')).data;
    }
  }
};
</script>
