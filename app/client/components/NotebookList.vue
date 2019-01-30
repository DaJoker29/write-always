<template>
  <section>
    <SortNotebooks />
    <TransitionGroup name="notebook-list" tag="div" class="notebook-list">
      <NotebookListing
        v-for="notebook in notebooks"
        :key="notebook.uid"
        :notebook="notebook"
      />
    </TransitionGroup>
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
.notebook-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

h2 {
  flex: 100%;
}

.notebook-list-move {
  transition: transform var(--transition-long);
}
</style>
