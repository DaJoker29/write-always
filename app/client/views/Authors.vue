<template>
  <main>
    <SortAuthors v-if="allUsers.length" />
    <p v-else>No authors yet.</p>
    <TransitionGroup name="author-list" class="author-list" tag="div">
      <AuthorsListArticle
        v-for="author in allUsers"
        :key="author.uid"
        :author="author"
      />
    </TransitionGroup>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    AuthorsListArticle: () => import('@client/components/AuthorsListArticle'),
    SortAuthors: () => import('@client/components/SortAuthors')
  },
  computed: {
    ...mapGetters(['allUsers'])
  },
  mounted: async function() {
    this.fetchAllUsers();
  },
  methods: {
    ...mapActions(['fetchAllUsers'])
  }
};
</script>

<style scoped>
.author-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.author-list-move {
  transition: transform var(--transition-long);
}
</style>
