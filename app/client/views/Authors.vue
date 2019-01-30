<template>
  <main>
    <SortAuthors />
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
import AuthorsListArticle from '@client/components/AuthorsListArticle';
import SortAuthors from '@client/components/SortAuthors';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    AuthorsListArticle,
    SortAuthors
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
