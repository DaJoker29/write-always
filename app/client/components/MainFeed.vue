<template>
  <main class="main-feed">
    <Article
      v-for="(post, index) in posts"
      :key="`post-${index}`"
      :post="post"
    />
  </main>
</template>

<script>
import Article from './MainFeedArticle';

const post = {
  title: 'Some kind of title goes here',
  author: 'Some Author',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus omnis reprehenderit modi voluptas nihil, quas accusantium ducimus ut ipsam autem nesciunt consequuntur explicabo unde, itaque eius cumque ipsum commodi a.',
  pubDate: Date.now()
};

export default {
  components: {
    Article
  },
  data: function() {
    return {
      posts: [post, post, post, post]
    };
  }
};
</script>

<style scoped>
.main-feed {
  display: flex;
  flex-flow: row wrap;
}
</style>
