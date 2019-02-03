<template>
  <main><button @click="facebookLogin">Facebook Sign-in</button></main>
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
