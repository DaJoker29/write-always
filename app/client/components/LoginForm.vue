<template>
  <form class="login-form">
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
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
        const request = { baseURL: '/auth/' };
        const params = {
          username: this.inputUser,
          password: this.inputPass
        };
        const { token, username, uid } = (await this.$http.post(
          '/login',
          params,
          request
        )).data;

        this.login({ token, username, uid });
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
