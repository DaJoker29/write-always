<template>
  <aside>
    <h3>Welcome back, {{ user.displayName }}!</h3>
  </aside>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
aside {
  background-color: var(--color-black);
  color: var(--color-white);
}
</style>
