<template>
  <section>
    <h2>{{ author.displayName }}</h2>
    <p v-if="active()" class="active">Currently active</p>
    <p v-if="author.location">From {{ author.location }}</p>
  </section>
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
    active() {
      const now = this.moment();
      const lastLogin = this.moment(this.author.dateLastLogin);
      return now.diff(lastLogin, 'minutes') < 15;
    }
  }
};
</script>

<style scoped>
.active {
  color: var(--color-red);
  font-weight: bold;
}
</style>
