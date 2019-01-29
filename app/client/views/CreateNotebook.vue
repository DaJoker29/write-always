<template>
  <main>
    <input v-model="title" type="text" placeholder="Title of Notebook" />
    <input id="isPrivate" v-model="isPrivate" type="checkbox" />
    <label for="isPrivate">Private?</label>
    <input id="isShared" v-model="isShared" type="checkbox" />
    <label for="isShared">Shared?</label>
    <button @click="submitEntry">Create</button>
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
      const response = await this.$http.post('/notebook/create', data);
      console.log(response);
    }
  }
};
</script>

<style scoped></style>
