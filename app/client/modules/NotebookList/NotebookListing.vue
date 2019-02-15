<template>
  <article>
    <RouterLink :to="notebook.notebookURL">
      <h2 :class="{ recent: recentUpdate(notebook) }">
        <i v-if="notebook.isPrivate" class="fa fa-lock"></i>
        <i v-else-if="notebook.isShared" class="fa fa-users"></i>
        <i
          v-else
          :class="['fa', canEdit(notebook) ? 'fa-edit' : 'fa-book']"
        ></i>
        <span>{{ notebook.title }}</span>
      </h2>
    </RouterLink>
    <p>
      <i class="fa fa-address-card"></i>
      <RouterLink :to="notebook.owner.profileURL">{{
        notebook.owner.displayName
      }}</RouterLink>
    </p>
    <h4>Latest Entry</h4>
    <p>
      {{
        allEntries[notebook.uid]
          ? latestEntry(allEntries[notebook.uid]).body
          : 'Nothing found'
      }}
    </p>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    notebook: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'allEntries', 'currentUser', 'sort'])
  },
  methods: {
    canEdit(notebook) {
      return (
        this.isLoggedIn &&
        (notebook.isShared || notebook.owner.uid === this.currentUser.uid)
      );
    },
    recentUpdate(notebook) {
      const now = this.moment();
      const then = this.moment(notebook.updatedAt);
      return now.diff(then, 'days') < 1;
    },
    latestEntry(entries) {
      return entries.slice().reduce((acc, curr) => {
        return this.moment(acc).isBefore(curr) ? curr : acc;
      });
    }
  }
};
</script>

<style scoped>
h2 > span {
  text-decoration: underline;
}
.recent::after {
  content: '*';
  color: var(--color-red);
}

h2 > .fa {
  color: var(--color-black);
}

article {
  flex: 1 1 auto;
  margin-right: var(--spacing-double);
  margin-bottom: var(--spacing-double);
  padding-right: var(--spacing-double);
}
</style>
