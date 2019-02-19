<template>
  <main>
    <h3>Notebook: {{ fetchName(notebookID) }}</h3>
    <label>Title? <input v-model="hasTitle" type="checkbox" /> </label>
    <input v-show="hasTitle" v-model="title" type="text" placeholder="Title" />
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
      hasTitle: false,
      title: '',
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
      const { body, notebookID, hasTitle, title } = this;
      const data = {
        body,
        notebook: notebookID
      };

      if (hasTitle) {
        data.title = title;
      }

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
