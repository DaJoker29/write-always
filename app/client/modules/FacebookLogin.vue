<template>
  <form><button @click="facebookLogin">Facebook Sign-in</button></form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['loginToFacebook']),
    facebookLogin() {
      this.loginToFacebook();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
form {
  padding: var(--spacing);
}
</style>
