<template>
  <article>
    <h3>
      {{ moment(entry.createdAt).format('LL') }}

      ({{ moment(entry.createdAt).format('LT') }})
      <span>
        <RouterLink :to="entry.author.profileURL">
          {{ entry.author.displayName }}
        </RouterLink>
      </span>
    </h3>
    <p v-html="marked(entry.body)"></p>
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
article {
  padding: var(--spacing);
  flex: 1 1 100%;
}

h3 > span {
  margin-left: var(--spacing);
  font-size: var(--font-size);
  font-weight: bold;
}

p {
  font-weight: bold;
}
</style>
