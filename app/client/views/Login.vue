<template>
  <main>
    <div
      class="fb-login-button"
      data-size="large"
      data-button-type="continue_with"
      data-auto-logout-link="true"
      data-use-continue-as="true"
    ></div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['config'])
  },
  created() {
    const config = this.config;
    const login = this.login;
    window.fbAsyncInit = function() {
      FB.init({
        appId: config.app.fbAppID,
        cookie: true,
        xfbml: true,
        version: config.app.fbAppVersion
      });

      FB.AppEvents.logPageView();

      FB.getLoginStatus(({ status, authResponse }) => {
        if (status === 'connected') {
          // Log in user
          login({ method: 'fb', auth: authResponse });
        } else {
          // Request to log the user in
        }
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  methods: {
    ...mapActions(['login'])
  }
};
</script>
