<template>
  <header class="site-header">
    <div class="header-shell">
      <div class="logo"><a href=""> Write, Always</a></div>
      <div class="search">
        <a class="btn-search" @click="toggleSearch"
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
        <li><a href="/authors"> Authors </a></li>
        <li><a href="/stories"> Stories </a></li>
        <li><a href="/contact"> Contact </a></li>
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
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['toggleSearch', 'toggleNav'])
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
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-long);
  background: 0 0;
}

.search-open .search-box {
  opacity: 1;
  visibility: visible;
  background: var(--color-black);
}

.search-field {
  margin: var(--spacing) 0;
  padding: 0 var(--spacing-double);
  display: block;
  width: 100%;
  border: 1px solid transparent;
  background: none;
  color: var(--color-cream);
  font-size: var(--h4);
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

.nav-open .nav {
  transform: scale(1);
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

.nav-open .btn-hamburger,
.nav-open .logo a {
  color: var(--color-white);
  padding: var(--spacing);
}
</style>
