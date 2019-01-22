<template>
  <main>
    <SingleAuthorHeader :author="author" />
    <NotebookList v-show="notebooks.length > 0" :notebooks="notebooks" />
  </main>
</template>

<script>
import SingleAuthorHeader from '@client/components/SingleAuthorHeader';
import NotebookList from '@client/components/NotebookList';

export default {
  components: {
    SingleAuthorHeader,
    NotebookList
  },
  data: function() {
    return {
      author: {},
      notebooks: []
    };
  },
  watch: {
    $route: async function(to, from) {
      this.author = await this.updateAuthor(to.params.authorID);
      this.notebooks = await this.updateNotebooks(to.params.authorID);
    }
  },
  created: async function() {
    this.author = await this.updateAuthor(this.$route.params.authorID);
    this.notebooks = await this.updateNotebooks(this.$route.params.authorID);
  },
  methods: {
    updateAuthor: async function(authorID) {
      return (await this.$http.get(`/user/${authorID}`)).data;
    },
    updateNotebooks: async function(authorID) {
      return (await this.$http.get(`/notebooks?u=${authorID}`)).data;
    }
  }
};
</script>
