<template>
  <main class="login-form">
    <h3>Log in</h3>
    <h4 v-if="message.length">{{ message }}</h4>
    <input v-model="username" type="text" placeholder="Enter username..." />
    <Transition name="fade">
      <input
        v-if="username.length > 3"
        v-model="password"
        type="password"
        placeholder="Enter passcode..."
        @keyup.enter="authenticate"
      />
    </Transition>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    message: function() {
      if (this.username.length <= 3) {
        return 'Please enter a valid username';
      } else if (this.password.length <= 3) {
        return 'Please enter a valid passcode';
      }
      return 'Invalid username or password';
    }
  },
  methods: {
    ...mapActions(['login']),
    authenticate: function() {
      if (this.username.length > 3 && this.password.length > 3) {
        this.login({ username: this.username });
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  text-align: center;
  margin: 0 auto;
  max-width: 480px;
}
</style>
