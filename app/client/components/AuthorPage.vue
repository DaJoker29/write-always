<template>
  <main>
    <h2>{{ author.displayName }}</h2>
    <p>{{ author.location }}</p>
    <div v-if="author.notebooks !== undefined">
      <h3>Notebooks ({{ author.notebooks.length }})</h3>
      <AuthorPageNotebook
        v-for="notebook in author.notebooks"
        :key="notebook.uid"
        :notebook="notebook"
      />
    </div>
    {{ author }}
  </main>
</template>

<script>
import AuthorPageNotebook from './AuthorPageNotebook';

export default {
  components: { AuthorPageNotebook },
  props: {
    author: {
      type: Object,
      required: true
    }
  }
};
</script>
