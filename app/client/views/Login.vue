<template>
  <main>
    <FacebookLogin
      class="button"
      :app-id="config.app.fbAppID"
      @login="getUserData"
      @get-initial-status="getUserData"
    >
    </FacebookLogin>
    <!--     <VFacebookLogin app-id="config.app.fbAppID"></VFacebookLogin>
 -->
  </main>
</template>

<script>
// import LoginForm from '@client/components/LoginForm';
// import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component';
import { mapGetters } from 'vuex';
import FacebookLogin from 'facebook-login-vuejs';

export default {
  components: {
    // LoginForm,
    // VFacebookLogin
    FacebookLogin
  },
  computed: {
    ...mapGetters(['config'])
  },
  created() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: this.config.app.fbAppID,
        cookie: true,
        xfbml: true,
        version: this.config.app.fbAppVersion
      });

      FB.AppEvents.logPageView();
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
    getUserData(data) {
      console.log(data);
    }
  }
};
</script>
