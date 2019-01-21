<template>
  <header class="site-header">
    <div class="header-shell">
      <div class="logo">
        <RouterLink :to="{ name: 'home' }" @click.native="closeNav"
          >Write, Always</RouterLink
        >
      </div>
      <div class="search">
        <a
          class="btn-search"
          :class="{ active: isSearchOpen }"
          @click="toggleSearch"
          ><i class="fas fa-search"></i
        ></a>
      </div>
      <div class="hamburger">
        <a class="btn-hamburger" @click="toggleNav">
          <i class="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <nav class="nav">
      <ul>
        <!-- Link to profile/account page should go here -->
        <li>
          <RouterLink :to="{ name: 'authors' }" @click.native="closeNav">
            Authors
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'createNotebook' }" @click.native="closeNav">
            Create Notebook
          </RouterLink>
        </li>
        <li><a href="/contact"> Contact </a></li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'login' }" @click.native="toggleNav"
            >Log In</RouterLink
          >
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'home' }" @click.native="logoutFunc"
            >Log out</RouterLink
          >
        </li>
      </ul>
    </nav>
    <div class="search-box">
      <form class="search-form">
        <input
          id="search-field"
          type="text"
          class="search-field"
          placeholder="Search..."
          name="query"
          autocomplete="off"
        />
      </form>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isNavOpen', 'isSearchOpen', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['toggleSearch', 'toggleNav', 'closeNav', 'logout']),
    logoutFunc() {
      this.toggleNav();
      this.logout();
    }
  }
};
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  border-bottom: var(--spacing-half) solid var(--color-blue);
  padding: var(--spacing-half) var(--spacing);
  z-index: 16;
}

.header-shell {
  display: flex;
  overflow: hidden;
  flex-flow: row nowrap;
  align-items: center;
}

.logo {
  flex: 1;
}

.logo,
.hamburger {
  z-index: 100;
  transition: var(--transition);
}

.logo a {
  color: var(--color-black);
  border-bottom: 0;
  font: bold var(--h2) / var(--line-height) var(--font-headings);
}

.hamburger a,
.search a {
  margin-left: var(--spacing-half);
  padding: 0 var(--spacing-half);
  text-align: center;
  font-size: var(--h4);
}

.search-box {
  position: absolute;
  margin-top: var(--spacing-half);
  left: 0;
  right: 0;
  width: 100%;
  transition: var(--transition-long);
  transform: scaleY(0);
  transform-origin: top center;
}

.search-box:focus-within {
  box-shadow: inset 0 0 var(--spacing) 0 black;
}

.search-open .search-box {
  background: var(--color-black);
  transform: scaleY(1);
}

.search-field {
  background: none;
  box-shadow: none;
}

.nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-red);
  text-align: center;
  font-size: var(--h1);
  z-index: 99;
  transform: scale(0);
  transition: var(--transition);
}

.nav ul {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
}

.nav a {
  color: var(--color-white);
  font-weight: bold;
}

.btn-hamburger,
.logo a {
  transition: var(--transition);
}

.nav-open .nav {
  transform: scale(1);
}

.nav-open .btn-hamburger,
.nav-open .logo a {
  color: var(--color-white);
  padding: var(--spacing);
}
</style>

<style>
/* Loading Bar Styles (NProgress) */

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: var(--color-black);
  position: fixed;
  left: 0;
  bottom: 0;
  top: auto;
  width: 100%;
  height: 2px;
  z-index: 12;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px var(--color-black), 0 0 5px var(--color-black);
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}
</style>
