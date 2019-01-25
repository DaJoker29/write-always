<template>
  <main>
    <AuthorsListArticle
      v-for="author in allUsers"
      :key="author.uid"
      :author="author"
    />
  </main>
</template>

<script>
import AuthorsListArticle from '@client/components/AuthorsListArticle';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    AuthorsListArticle
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
main {
  display: flex;
  flex-flow: row wrap;
}

/deep/ article {
  padding: var(--spacing);
  flex: 1 25%;
}
</style>
