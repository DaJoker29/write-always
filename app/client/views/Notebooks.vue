<template>
  <main>
    <NotebookListing
      v-for="notebook in notebooks"
      :key="notebook.uid"
      :notebook="notebook"
    />
  </main>
</template>

<script>
import NotebookListing from '@client/components/NotebookListing';
import http from '@client/http-common';

export default {
  components: {
    NotebookListing
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
      const notebooks = (await http.get('/api/notebooks')).data;
      console.log(notebooks);
      return notebooks;
    }
  }
};
</script>
