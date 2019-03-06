<template>
  <article>
    <header>
      <div class="time">
        <time>{{ moment(story.createdAt).fromNow() }}</time>
      </div>
      <div class="title">
        <h3>{{ story.title }}</h3>
      </div>
      <div v-if="story.author" class="author">
        <span class="author"
          >by <a>{{ story.author.displayName }}</a></span
        >
      </div>
    </header>
    <section>
      <p v-if="story.description">{{ story.description }}</p>
    </section>
    <footer>
      <p><i class="far fa-clock"></i> {{ readingTime(story.content) }}</p>
      <p v-if="story.isPremium">
        <i class="fas fa-donate"></i> Subscribers Only
      </p>
    </footer>
  </article>
</template>

<script>
import time from 'reading-time';

export default {
  props: {
    story: {
      required: true,
      type: Object
    }
  },
  methods: {
    readingTime: function(text) {
      return time(text).text;
    }
  }
};
</script>

<style scoped>
article {
  flex: 0 1 33%;
  padding: var(--spacing) var(--spacing-double);
}

article:hover {
  cursor: pointer;
  transform: scale(1.02);
  background-color: var(--color-white);
  filter: drop-shadow(0 0 var(--spacing-half) var(--color-grey));
}

article:hover h3 {
  color: var(--color-blue);
  cursor: pointer;
}

article > header {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: var(--spacing-double);
}

.time,
.author {
  flex: 2em;
}

.title {
  flex: 8em;
}

time {
  font-size: var(--small);
  color: var(--color-grey);
  font-style: italic;
  text-align: right;
  display: block;
}

h3 {
  font-weight: bold;
  padding: var(--spacing-half) 0;
  margin: var(--spacing-half) 0 var(--spacing);
  line-height: var(--line-height-body);
  display: inline;
  text-decoration: none;
  background-image: linear-gradient(var(--color-black), var(--color-black));
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: center bottom 29%;
  background-origin: padding-box;
  text-shadow: var(--color-cream) 3px 0, var(--color-cream) 2px 0,
    var(--color-cream) 1px 0, var(--color-cream) 0px 0,
    var(--color-cream) -1px 0, var(--color-cream) -2px 0,
    var(--color-cream) 3px 0;
}

footer {
  color: var(--color-grey);
  font-size: var(--small);
}

footer > p {
  margin-bottom: var(--spacing-half);
}

.author {
  color: var(--color-grey);
  display: inline;
  margin-top: var(--spacing);
}

.author > a {
  cursor: pointer;
  font-weight: bold;
  display: inline;
  text-decoration: none;
  background-image: linear-gradient(var(--color-grey), var(--color-grey));
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: center bottom 8%;
  background-origin: padding-box;
  text-shadow: var(--color-cream) 3px 0, var(--color-cream) 2px 0,
    var(--color-cream) 1px 0, var(--color-cream) 0px 0,
    var(--color-cream) -1px 0, var(--color-cream) -2px 0,
    var(--color-cream) 3px 0;
}
</style>
