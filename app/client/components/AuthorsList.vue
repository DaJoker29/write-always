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
import http from '@client/http-common';
import AuthorsListArticle from './AuthorsListArticle';

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
      const response = await http.get('/api/users');
      return response.data;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-flow: row wrap;
}
</style>
