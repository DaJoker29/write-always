<template>
  <main>
    <SingleAuthorHeader :author="selectAuthor(authorID)" />
    <NotebookList :notebooks="notebooks" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    SingleAuthorHeader: () => import('./SingleAuthorHeader'),
    NotebookList: () => import('@client/modules/NotebookList')
  },
  computed: {
    ...mapGetters(['allNotebooks', 'allUsers']),
    notebooks: function() {
      return this.allNotebooks.filter(
        notebook => notebook.owner.uid === this.$route.params.authorID
      );
    },
    authorID() {
      return this.$route.params.authorID || '';
    }
  },
  watch: {
    $route: async function(to, from) {
      this.fetchAllNotebooks();
    }
  },
  created: async function() {
    this.fetchAllNotebooks();
  },
  methods: {
    ...mapActions(['fetchAllNotebooks']),
    selectAuthor(uid) {
      return this.allUsers.find(e => e.uid === uid);
    }
  }
};
</script>
