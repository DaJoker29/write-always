<template>
  <AuthorPage :author="author" />
</template>

<script>
import AuthorPage from '@client/components/AuthorPage';

export default {
  components: {
    AuthorPage
  },
  data: function() {
    return {
      author: {}
    };
  },
  watch: {
    $route: async function(to, from) {
      this.author = await this.updateAuthor(to.params.authorID);
    }
  },
  created: async function() {
    this.author = await this.updateAuthor(this.$route.params.authorID);
  },
  methods: {
    updateAuthor: async function(authorID) {
      const author = (await this.$http.get(`/user/${authorID}`)).data;
      const notebooks = (await this.$http.get(`/notebooks?u=${authorID}`)).data;
      return Object.assign(author, { notebooks });
    }
  }
};
</script>
