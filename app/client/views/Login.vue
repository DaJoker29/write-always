<template>
  <main><button @click="facebookLogin">Facebook Sign-in</button></main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['checkFBStatus']),
    facebookLogin() {
      window.FB.login(response => {
        this.checkFBStatus();
        this.$router.push('/');
      });
    }
  }
};
</script>
