<template>
  <article>
    <header>
      <strong>{{ entry.author.displayName }}</strong>
      <span class="muted"
        >@username &bull; {{ moment(entry.createdAt).fromNow() }}</span
      >
      <span class="options"> <i class="fa fa-ellipsis-h"></i> </span>
    </header>
    <section>
      <p>{{ entry.content }}</p>
    </section>
    <footer>
      <p class="meta">
        <i class="far fa-star"></i> <i class="far fa-comments"></i>
        <i class="far fa-share-square"></i>
      </p>
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    entry: {
      required: true
    }
  }
};
</script>

<style scoped>
article {
  border-bottom: 1px solid var(--color-grey);
  padding: var(--spacing-half) var(--spacing);
}

article p {
  margin-bottom: var(--spacing-half);
}

.muted {
  color: var(--color-grey);
  font-size: var(--small);
}

.options {
  float: right;
  color: var(--color-grey);
}

.meta {
  display: flex;
  flex-flow: row wrap;
}

.meta i {
  flex: 1;
  text-align: center;
  color: var(--color-grey);
}
</style>
