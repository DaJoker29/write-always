<template>
  <header class="site-header">
    <div class="logo"><a href=""> Write, Always</a></div>
    <div class="search">
      <a class="btn-search"><i class="fas fa-search"></i></a>
    </div>
    <div class="hamburger">
      <a class="btn-hamburger"> <i class="fas fa-bars"></i> </a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: var(--spacing) solid var(--color-blue);
  padding: var(--spacing);
  overflow: hidden;
}

.site-header > .logo {
  display: inline-block;
  flex: 1;
}

.site-header .logo a {
  display: inline-block;
  color: var(--color-black);
  border-bottom: 0;
  font: bold var(--h4) var(--font-headings);
}

.site-header .hamburger {
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
</style>
