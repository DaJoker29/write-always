<template>
  <article class="home-feed-article">
    <header>
      <h2>
        <a class="article-title" href=""> {{ post.title }} </a>
        <a class="article-author" href=""> {{ post.author }} </a>
      </h2>
    </header>
    <section class="article-body">{{ post.content }}</section>
    <footer>
      <p class="article-meta">
        <time class="article-date">{{ post.pubDate }}</time> &bull;
        <a href=""> Edit </a> &bull; <a href=""> Critique </a> &bull;
        <a href=""> Comment </a>
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
.home-feed-article {
  margin: var(--spacing);
  flex: 1 1 var(--bp-1);
}

.home-feed-article header a {
  border-bottom: 0;
}

.article-title:link,
.article-title:visited {
  font-size: var(--h1);
  color: var(--color-black);
  font-weight: 700;
}

.article-title:hover,
.article-title:focus,
.article-title:active {
  font-weight: 400;
}

.article-author:link,
.article-author:visited {
  font-size: var(--font-size);
  font-family: var(--font-main);
}

.article-author:hover,
.article-author:focus,
.article-author:active {
}
</style>
