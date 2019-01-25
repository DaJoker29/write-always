<template>
  <section>
    <h2>Notebooks ({{ notebooks.length }})</h2>
    <NotebookListing
      v-for="notebook in notebooks"
      :key="notebook.uid"
      :notebook="notebook"
    />
  </section>
</template>

<script>
import NotebookListing from '@client/components/NotebookListing';

export default {
  components: {
    NotebookListing
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
