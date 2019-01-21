<template>
  <article>
    <RouterLink :to="notebook.notebookURL">
      <h2>{{ notebook.title }}</h2>
    </RouterLink>
    {{ notebook }}
  </article>
</template>

<script>
export default {
  props: {
    notebook: {
      type: Object,
      required: true
    }
  }
};
</script>
