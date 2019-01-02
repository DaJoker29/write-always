<template>
  <article class="story">
    <header>
      <h2>
        <a class="story-title" href=""> {{ post.title }} </a>
        <a class="author-name" href=""> {{ post.author }} </a>
      </h2>
    </header>
    <section class="story-body">{{ post.content }}</section>
    <footer>
      <p>
        <time>{{ post.pubDate }}</time> &bull; <a href=""> Edit </a> &bull;
        <a href=""> Critique </a> &bull; <a href=""> Comment </a>
      </p>
    </footer>
  </article>
</template>

<script>
export default {
  props: ['post']
};
</script>

<style scoped>
.story {
  margin: var(--spacing);
}

.story header a {
  border-bottom: 0;
}

.story-title:link,
.story-title:visited {
  font-size: var(--h1);
  color: var(--color-black);
  font-weight: 700;
}

.story-title:hover,
.story-title:focus,
.story-title:active {
  font-weight: 400;
}

.author-name:link,
.author-name:visited {
  font-size: var(--font-size);
  font-family: var(--font-main);
}

.author-name:hover,
.author-name:focus,
.author-name:active {
}
</style>
