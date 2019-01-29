<template>
  <article>
    <RouterLink :to="author.profileURL">
      <h3>{{ author.displayName }}</h3>
    </RouterLink>
    <p v-if="activeNow()" class="active-now">Online now!</p>
    <p>Joined {{ moment(author.dateJoined).fromNow() }}</p>
    <p>{{ author.location }}</p>
  </article>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  },
  methods: {
    activeNow() {
      const now = this.moment();
      const lastLogin = this.moment(this.author.dateLastLogin);
      return now.diff(lastLogin, 'minutes') < 15;
    }
  }
};
</script>

<style scoped>
.active-now {
  color: var(--color-red);
  font-weight: bold;
}
</style>
