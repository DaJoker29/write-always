<template>
  <main>
    <input v-model="title" type="text" placeholder="Title of Notebook" />
    <input id="isPrivate" v-model="isPrivate" type="checkbox" />
    <label for="isPrivate">Private?</label>
    <input id="isShared" v-model="isShared" type="checkbox" />
    <label for="isShared">Shared?</label>
    <button @click="submitEntry">Create Notebook</button>
  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: function() {
    return {
      title: '',
      isPrivate: false,
      isShared: false
    };
  },
  computed: {
    ...mapState['username']
  },
  methods: {
    async submitEntry() {
      const { title, isPrivate, isShared } = this;
      const data = {
        title,
        isPrivate,
        isShared,
        owner: this.username
      };
      await this.$http.post('/notebook/create', data);
      this.$router.push('/');
    }
  }
};
</script>

<style scoped></style>
