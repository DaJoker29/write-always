<template>
  <article>
    <RouterLink :to="author.profileURL">
      <h3>
        <i :class="['fa', activeNow() ? 'fa-podcast' : 'fa-user']"></i>
        <span>{{ author.displayName }}</span>
      </h3>
    </RouterLink>
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
.fa-podcast {
  color: var(--color-red);
}

h3 > span {
  text-decoration: underline;
}

article {
  flex: 1 1 auto;
  margin-right: var(--spacing-double);
  margin-bottom: var(--spacing-double);
  padding-right: var(--spacing-double);
}
</style>
