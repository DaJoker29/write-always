<template>
  <main>
    <h2>{{ notebook.title }} by {{ notebook.owner.displayName }}</h2>
    <RouterLink :to="notebook.createEntryURL">Create new Entry</RouterLink>
    <!-- Add Entries here -->
    <div v-if="notebook.entries">
      <h3>Entries ({{ notebook.entries.length }})</h3>
      <p v-for="entry in notebook.entries" :key="entry.uid">{{ entry.body }}</p>
    </div>
    <h3 v-else>No entries</h3>
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
