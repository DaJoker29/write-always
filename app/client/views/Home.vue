<template>
  <div>
    <aside class="intro">
      <p>
        Welcome! We are a community of writers and readers who are passionate
        about storytelling. Here we share our stories for the public at large.
      </p>
      <p>
        Currently, we are invite-only so if you would like to join,
        <a href=""> please contact one of our admins. </a>
      </p>
    </aside>
    <main><NotebookList :notebooks="notebooks" /></main>
  </div>
</template>

<script>
import NotebookList from '@client/components/NotebookList';

export default {
  components: {
    NotebookList
  },
  data: function() {
    return {
      notebooks: []
    };
  },
  created: async function() {
    this.notebooks = await this.fetchNotebooks();
  },
  methods: {
    fetchNotebooks: async function() {
      return (await this.$http.get('/notebooks')).data;
    }
  }
};
</script>

<style scoped>
.intro {
  padding: var(--spacing-half) var(--spacing);
  background-color: var(--color-red);
  color: var(--color-black);
  text-align: center;
}

.intro a:link,
.intro a:visited {
  color: var(--color-black);
}

.intro a:hover,
.intro a:focus,
.intro a:active {
  color: var(--color-blue);
}
</style>
