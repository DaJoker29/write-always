<template>
  <main>
    <SingleAuthorHeader :author="author" />
    <NotebookList :notebooks="notebooks" />
  </main>
</template>

<script>
import SingleAuthorHeader from '@client/components/SingleAuthorHeader';
import NotebookList from '@client/components/NotebookList';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    SingleAuthorHeader,
    NotebookList
  },
  data: function() {
    return {
      author: {}
    };
  },
  computed: {
    ...mapGetters(['allNotebooks']),
    notebooks: function() {
      return this.allNotebooks.filter(
        notebook => notebook.owner.uid === this.$route.params.authorID
      );
    }
  },
  watch: {
    $route: async function(to, from) {
      this.author = await this.updateAuthor(to.params.authorID);
      this.fetchAllNotebooks();
    }
  },
  created: async function() {
    this.author = await this.updateAuthor(this.$route.params.authorID);
    this.fetchAllNotebooks();
  },
  methods: {
    ...mapActions(['fetchAllNotebooks']),
    updateAuthor: async function(authorID) {
      return (await this.$http.get(`/user/${authorID}`)).data;
    }
  }
};
</script>
