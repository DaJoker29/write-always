<template>
  <article>
    <RouterLink :to="notebook.notebookURL">
      <h2>
        <strong v-if="recentUpdate(notebook)" class="recent">*</strong
        >{{ notebook.title }}
      </h2>
    </RouterLink>
    <p>
      <RouterLink :to="notebook.owner.profileURL">{{
        notebook.owner.displayName
      }}</RouterLink>
    </p>
    <p v-if="notebook.isPrivate"><strong>Private</strong></p>
    <p v-if="notebook.isShared"><strong>Shared</strong></p>
    <p>Started {{ moment(notebook.createdAt).fromNow() }}</p>
    <p>
      <RouterLink v-if="canEdit(notebook)" :to="notebook.createEntryURL"
        ><i class="fa fa-plus"></i> Add New Entry</RouterLink
      >
    </p>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    notebook: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['uid']),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    canEdit(notebook) {
      return (
        this.isLoggedIn &&
        (notebook.isShared || notebook.owner.uid === this.uid)
      );
    },
    recentUpdate(notebook) {
      const now = this.moment();
      const then = this.moment(notebook.updatedAt);
      return now.diff(then, 'days') < 1;
    }
  }
};
</script>

<style scoped>
.recent {
  color: var(--color-red);
}
</style>
