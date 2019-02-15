<template>
  <main>
    <h3>Notebook: {{ fetchName(notebookID) }}</h3>
    <textarea
      ref="entry"
      v-model="body"
      v-autosize="body"
      placeholder="Start typing here"
    ></textarea>
    <button @click="submit">Send</button>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      body: ''
    };
  },
  computed: {
    ...mapGetters(['allNotebooks']),
    notebookID() {
      return this.$route.query.n;
    }
  },
  methods: {
    async submit() {
      const { body, notebookID } = this;
      const data = {
        body,
        notebook: notebookID
      };
      await this.$http.post('/entry/create', data);
      this.$router.push({ name: 'notebook', params: { notebookID } });
    },
    fetchName(id) {
      return this.allNotebooks.find(e => e.uid === id).title.toUpperCase();
    }
  }
};
</script>

<style scoped>
textarea {
  margin: var(--spacing) auto;
}
</style>
