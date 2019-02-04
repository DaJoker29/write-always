<template>
  <section>
    <RouterLink
      v-if="canEdit(notebook)"
      class="create-new"
      :to="notebook.createEntryURL"
      >Write New Entry</RouterLink
    >
    <h2>
      <span> {{ notebook.title }} </span>
    </h2>
    <h4>{{ notebook.owner.displayName }}</h4>
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
    ...mapState(['currentUser']),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    canEdit(notebook) {
      return (
        this.isLoggedIn &&
        (notebook.isShared || notebook.owner.uid === this.currentUser.uid)
      );
    }
  }
};
</script>

<style scoped>
h2,
h4 {
  text-align: center;
  font-weight: bold;
  clear: both;
}

.create-new {
  float: right;
}
</style>
