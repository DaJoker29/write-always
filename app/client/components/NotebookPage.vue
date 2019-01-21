<template>
  <main>
    <h2>{{ notebook.title }} by {{ notebook.owner.displayName }}</h2>
    <RouterLink>Create new Entry</RouterLink>
    {{ notebook }}
    <!-- Add Entries here -->
  </main>
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
