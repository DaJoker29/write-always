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
