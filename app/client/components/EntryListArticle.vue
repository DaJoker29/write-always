<template>
  <article>
    <h2>
      {{ moment(entry.createdAt).format('LL') }} --
      {{ moment(entry.createdAt).format('LT') }}
    </h2>
    <h4>{{ entry.author.displayName }}</h4>
    <p>{{ entry.body }}</p>
  </article>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
h2,
h4,
.edited {
  text-align: center;
  font-weight: bold;
}
</style>
