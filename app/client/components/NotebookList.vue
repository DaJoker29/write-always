<template>
  <section>
    <h2>Notebooks ({{ notebooks.length }})</h2>
    <SortNotebooks />
    <NotebookListing
      v-for="notebook in notebooks"
      :key="notebook.uid"
      :notebook="notebook"
    />
  </section>
</template>

<script>
import NotebookListing from '@client/components/NotebookListing';
import SortNotebooks from '@client/components/SortNotebooks';

export default {
  components: {
    NotebookListing,
    SortNotebooks
  },
  props: {
    notebooks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-flow: row wrap;
  padding: var(--spacing);
}

h2 {
  flex: 100%;
}

/deep/ article {
  flex: 1 25%;
  padding: var(--spacing);
}
</style>
