<template>
  <body :class="{ 'search-open': isSearchOpen, 'nav-open': isNavOpen }">
    <SiteHeader />

    <div class="container"><RouterView /></div>
  </body>
</template>

<script>
import { mapState } from 'vuex';
import SiteHeader from './components/SiteHeader';

export default {
  components: {
    SiteHeader
  },
  computed: mapState(['isSearchOpen', 'isNavOpen'])
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css';
@import 'https://use.typekit.net/rai5ihu.css';
@import 'https://use.fontawesome.com/releases/v5.6.3/css/all.css';

/* TODO: Extract CSS to avoid FOUT*/
:root {
  --color-cream: #fffff0;
  --color-black: #212321;
  --color-white: #f2f2f2;
  --color-blue: #49a5a9;
  --color-red: #ed7a66;
  --color-grey: #757575;

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

  --transition: 0.3s;
  --transition-long: 1s;

  --bp-1: 767px;
}

*,
::after,
::before {
  box-sizing: border-box;
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

a {
  outline: none;
  text-decoration: none;
}

a:link,
a:visited {
  color: var(--color-blue);
  font-weight: 600;
  border-bottom: 1px dashed;
}

a:focus,
a:hover,
a:active {
  color: var(--color-red);
}

.container {
  margin-top: calc(var(--spacing-half) * 3 + var(--h2) * var(--line-height));
}

.search-open .container {
  filter: grayscale(0.8) blur(var(--spacing-half));
  z-index: -1;
}
</style>
