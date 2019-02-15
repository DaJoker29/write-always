<template>
  <main><NotebookList :notebooks="allNotebooks" /></main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    NotebookList: () => import('@client/modules/NotebookList')
  },
  computed: {
    ...mapGetters(['allNotebooks'])
  },
  watch: {
    $route() {
      this.initialFetch();
    }
  },
  created: async function() {
    this.initialFetch();
  },
  methods: {
    ...mapActions(['initialFetch'])
  }
};
</script>
