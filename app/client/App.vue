<template>
  <body :class="{ 'search-open': isSearchOpen, 'nav-open': isNavOpen }">
    <TheSiteHeader />

    <div class="container" @click="isSearchOpen === true ? toggleSearch : null">
      <TheSidebar v-if="isLoggedIn" />
      <Transition name="fade" mode="out-in"> <RouterView /> </Transition>
    </div>
  </body>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';

export default {
  components: {
    TheSiteHeader: () => import('@client/components/TheSiteHeader'),
    TheSidebar: () => import('@client/components/TheSidebar')
  },
  computed: {
    ...mapGetters([
      'config',
      'isLoggedIn',
      'isSearchOpen',
      'isNavOpen',
      'currentUser'
    ])
  },
  created() {
    NProgress.start();
    const vm = this;

    window.fbAsyncInit = function() {
      FB.init({
        appId: vm.config.app.fbAppID,
        xfbml: false,
        version: vm.config.app.fbAppVersion
      });

      FB.AppEvents.logPageView();
      vm.checkFBStatus();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/debug.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  mounted() {
    NProgress.done();
  },
  methods: {
    ...mapActions(['checkFBStatus'])
  }
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css';
@import 'https://use.typekit.net/rai5ihu.css';
@import 'https://use.fontawesome.com/releases/v5.6.3/css/all.css';

:root {
  --color-cream: #fffff0;
  --color-black: #212321;
  --color-white: #f2f2f2;
  --color-blue: #49a5a9;
  --color-red: #ed7a66;
  --color-grey: #757575;
  --color-green: #98ff7d;

  --font-main: open-sans, sans-serif;
  --font-headings: grandma, serif;
  --font-size: 20px;
  --line-height: 1.7;

  --h1: 2.441rem;
  --h2: 1.953rem;
  --h3: 1.563rem;
  --h4: 1.25rem;
  --small: 0.8rem;

  --spacing: var(--font-size);
  --spacing-double: calc(var(--spacing) * 2);
  --spacing-half: calc(var(--spacing) / 2);

  --transition: 0.2s;
  --transition-long: 0.8s;

  --bp-1: 767px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

*,
::after,
::before {
  box-sizing: border-box;
  transition: all var(--transition) linear;
  animation-duration: var(--transition);
}

html {
  background-color: var(--color-cream);
  color: var(--color-black);
  font-size: var(--font-size);
}

body {
  font-family: var(--font-main);
  line-height: var(--line-height);
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-headings);
}

h1,
.h1 {
  font-size: var(--h1);
  font-weight: 700;
}

h2,
.h2 {
  font-size: var(--h2);
}

h3,
.h3 {
  font-size: var(--h3);
}

h4,
.h4 {
  font-size: var(--h4);
}

small,
.small {
  font-size: var(--small);
}

a:link,
a:visited {
  color: var(--color-blue);
  font-weight: 600;
  border-bottom: 1px dashed;
  outline: none;
  text-decoration: none;
}

a:focus,
a:hover,
a:active {
  color: var(--color-red);
}

input,
textarea {
  margin: var(--spacing) 0;
  padding: var(--spacing-half) var(--spacing);
  display: inline-block;
  width: 100%;
  border: transparent;
  background: var(--color-black);
  color: var(--color-cream);
  font-size: var(--h4);
  resize: none;
}

input:focus {
  box-shadow: inset 0 0 var(--spacing) 0 black;
}

.container {
  margin-top: calc(var(--spacing-half) * 3 + var(--h2) * var(--line-height));
  transition: var(--transition-long);
  display: flex;
  flex-flow: row wrap;
}

.search-open .container {
  filter: grayscale(1) blur(var(--spacing-half));
  z-index: -1;
}

strong {
  font-weight: bolder;
}

main {
  margin: var(--spacing-double);
}

.container > aside {
  flex: 1;
  min-height: 100vh;
}

.container > main {
  flex: 3;
}

.box-container {
  box-shadow: inset 0 0 5px black;
  padding: var(--spacing);
  border-radius: var(--spacing);
  margin: var(--spacing-half) 0;
}
</style>
