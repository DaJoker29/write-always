<template>
  <section>
    <h2>{{ notebook.title }} by {{ notebook.owner.displayName }}</h2>
    <RouterLink v-if="canEdit(notebook)" :to="notebook.createEntryURL"
      >Create new Entry</RouterLink
    >
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

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
    }
  }
};
</script>
