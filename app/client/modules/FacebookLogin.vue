<template>
  <form>
    <fieldset v-if="connected">
      <p>Connected via Facebook as {{ fbProfile.name }}.</p>
      <p><a @click="fbLogout">Log Out</a></p>
    </fieldset>
    <fieldset v-else>
      <h2>Continue with Facebook</h2>
      <button @click.prevent="facebookLogin">Facebook Sign-in</button>
    </fieldset>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['fbStatus', 'fbProfile']),
    connected() {
      return this.fbStatus === 'connected';
    }
  },
  methods: {
    ...mapActions(['loginToFacebook', 'fbLogout']),
    facebookLogin() {
      this.loginToFacebook();
    }
  }
};
</script>

<style scoped>
form {
  padding: var(--spacing);
}
</style>
