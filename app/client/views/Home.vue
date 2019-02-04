<template>
  <main><NotebookList :notebooks="allNotebooks" /></main>
</template>

<script>
import NotebookList from '@client/components/NotebookList';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    NotebookList
  },
  computed: {
    ...mapGetters(['allNotebooks'])
  },
  created: async function() {
    this.initialFetch();
  },
  methods: {
    ...mapActions(['initialFetch'])
  }
};
</script>
