<template>
  <div class="feed-container">
    <Story />
    <Story />
    <Story />
    <Story />
    <Story />
    <Story />
    <Story />
    <Story />
    <Story />
  </div>
</template>

<script>
export default {
  components: {
    Story: () => import('./Story')
  }
};
</script>

<style scoped>
.feed-container {
  padding: var(--spacing);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
