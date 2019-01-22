<template>
  <main><NotebookList :notebooks="notebooks" /></main>
</template>

<script>
import NotebookList from './NotebookList';

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
      return (await this.$http.get('/notebooks')).data;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-flow: row wrap;
}
</style>
