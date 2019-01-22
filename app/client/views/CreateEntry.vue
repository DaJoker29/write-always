<template>
  <main>
    <textarea
      ref="entry"
      v-model="body"
      v-autosize="body"
      placeholder="Start typing here"
    ></textarea>
    <button @click="submit">Add Entry to {{ notebook }}</button>
  </main>
</template>

<script>
export default {
  data: function() {
    return {
      body: ''
    };
  },
  computed: {
    notebook() {
      return this.$route.query.n;
    }
  },
  methods: {
    async submit() {
      const { body, notebook } = this;
      const data = {
        body,
        notebook
      };
      const entry = await this.$http.post('/entry/create', data);
      console.log(entry);
    }
  }
};
</script>

<style scoped>
textarea {
  margin: var(--spacing) auto;
}
</style>
