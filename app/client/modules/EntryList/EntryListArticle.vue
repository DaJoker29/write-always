<template>
  <article>
    <header v-if="entry.title">{{ entry.title }}</header>
    <section v-html="marked(entry.body)"></section>
    <footer>
      <time>
        {{ moment(entry.createdAt).format('LL') }}

        ({{ moment(entry.createdAt).format('LT') }})
      </time>
      <p>
        <RouterLink :to="entry.author.profileURL">
          {{ entry.author.displayName }}
        </RouterLink>
      </p>
    </footer>
    <div class="sep"></div>
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

article > header {
  font-weight: bold;
  font-size: var(--h3);
  text-align: center;
}

article > section {
  padding: 0 var(--spacing);
  border-width: 0 2px;
  border-style: dotted;
  border-color: rgba(0, 0, 0, 0.3);
}

article > footer {
  font-size: var(--small);
  text-align: right;
  color: var(--color-grey);
}
</style>
