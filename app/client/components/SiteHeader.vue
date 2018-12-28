<template>
  <header class="site-header">
    <div class="header-shell">
      <div class="logo"><a href=""> Write, Always</a></div>
      <div class="search">
        <a class="btn-search"><i class="fas fa-search"></i></a>
      </div>
      <div class="hamburger">
        <a class="btn-hamburger"> <i class="fas fa-bars"></i> </a>
      </div>
    </div>
    <div class="search-box">
      <form class="search-form">
        <input
          id="search-field"
          type="text"
          class="search-field"
          placeholder="Search"
          name="query"
          autocomplete="off"
        />
      </form>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  border-bottom: var(--spacing) solid var(--color-blue);
  padding: var(--spacing);
}

.header-shell {
  display: flex;
  overflow: hidden;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: 1px solid var(--color-black);
}

.site-header .logo {
  display: inline-block;
  flex: 1;
}

.site-header .logo a {
  display: inline-block;
  color: var(--color-black);
  border-bottom: 0;
  font: bold var(--h3) var(--font-headings);
}

.site-header .hamburger,
.site-header .search {
  flex: 0 0 2rem;
  margin-left: var(--spacing);
  display: inline-block;
  padding: calc(var(--spacing) / 2) var(--spacing);
  text-align: center;
  border-radius: 0.125rem;
}

.search-field {
  margin: var(--spacing-double) 0;
  padding: 0 var(--spacing-double);
  display: block;
  width: 100%;
  border: 1px solid transparent;
  background: 0 0;
  font-size: var(--h4);
}
</style>
