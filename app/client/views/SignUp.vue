<template>
  <main>
    <form @submit.prevent="onSubmit">
      <h3>Creating an account...</h3>
      <label>
        Username <input v-model="username" type="text" placeholder="Username" />
      </label>
      <label>
        Display Name
        <input v-model="displayName" type="text" placeholder="Display Name" />
      </label>
      <p>Your Facebook Email ({{ email }}) will be linked to this account.</p>
      <button>Create</button>
    </form>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      displayName: ''
    };
  },
  computed: {
    ...mapGetters(['fbProfile']),
    email() {
      return this.fbProfile.email;
    },
    name() {
      return this.fbProfile.name;
    }
  },
  watch: {
    fbProfile() {
      this.displayName = this.name;
    }
  },
  created() {
    this.displayName = this.name;
  },
  methods: {
    async onSubmit() {
      const data = {
        username: this.username,
        displayName: this.displayName,
        email: this.email
      };

      const response = await this.$http.post('/users', { data });

      if (response.status === 200) {
        this.login(response.data);
        // Log in user
      }
    }
  }
};
</script>

<style scoped>
form {
  padding: var(--spacing);
}
</style>
