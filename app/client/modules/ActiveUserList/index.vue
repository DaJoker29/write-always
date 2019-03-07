<template>
  <aside>
    <small>{{ activeCount }} Active User{{ activeCount > 1 ? 's' : '' }}</small>
    <TransitionGroup name="users-list" tag="ul">
      <li
        v-for="user in allUsers"
        :key="user._id"
        :class="{ active: isActive(user) }"
      >
        {{ user.displayName }}
      </li>
    </TransitionGroup>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['allUsers']),
    activeCount() {
      return this.allUsers.filter(user => this.isActive(user)).length;
    }
  },
  methods: {
    isActive(user) {
      const now = this.moment();
      const lastLogin = this.moment(user.dateLastLogin);
      return now.diff(lastLogin, 'minutes') < 15;
    }
  }
};
</script>

<style scoped>
aside {
  padding: var(--spacing);
}

ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin: var(--spacing-half) 0;
}

ul > li {
  margin: 0 var(--spacing-half);
  padding: 0 var(--spacing-half);
  font-size: var(--small);
  display: inline;
  border-radius: var(--spacing-half);
  background-color: var(--color-grey);
  color: var(--color-white);
}

.active {
  background-color: var(--color-blue);
}

small {
  display: block;
  color: var(--color-grey);
  font-style: italic;
  text-align: right;
}
</style>
