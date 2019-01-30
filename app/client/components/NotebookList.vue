<template>
  <section>
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
  justify-content: space-evenly;
}

h2 {
  flex: 100%;
}

/deep/ article {
  flex: 0 1 auto;
  margin-right: var(--spacing-double);
  margin-bottom: var(--spacing-double);
  padding-right: var(--spacing-double);
}
</style>
