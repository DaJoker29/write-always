<template>
  <main>
    <AuthorsListArticle
      v-for="author in authors"
      :key="author.uid"
      :author="author"
    />
  </main>
</template>

<script>
import AuthorsListArticle from '@client/components/AuthorsListArticle';

export default {
  components: {
    AuthorsListArticle
  },
  data: function() {
    return {
      authors: []
    };
  },
  mounted: async function() {
    this.authors = await this.fetchAuthors();
  },
  methods: {
    fetchAuthors: async function() {
      return (await this.$http.get('/users')).data;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-flow: row wrap;
}

/deep/ article {
  padding: var(--spacing);
  flex: 1 25%;
}
</style>
