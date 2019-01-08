<template>
  <main class="login-form">
    <h3>Log in</h3>
    <h4 v-if="message.length">{{ message }}</h4>
    <input v-model="inputUser" type="text" placeholder="Enter username..." />
    <Transition name="fade">
      <input
        v-if="inputUser.length > 3"
        v-model="inputPass"
        type="password"
        placeholder="Enter passcode..."
        @keyup.enter="authenticate"
      />
    </Transition>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data: function() {
    return {
      inputUser: '',
      inputPass: '',
      message: ''
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['login']),
    authenticate: async function() {
      try {
        const response = await axios.post('/auth/login', {
          username: this.inputUser,
          password: this.inputPass
        });
        const { token, username } = response.data;
        this.login({ token, username });
        this.$router.push('/');
      } catch (e) {
        this.inputUser = '';
        this.inputPass = '';
        this.message = 'Incorrect username or passcode';
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
