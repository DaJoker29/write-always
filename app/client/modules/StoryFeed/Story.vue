<template>
  <article>
    <header>
      <time>6 Days Ago</time>
      <h3>Breaking Boxes with CSS Fragmentation</h3>
      <p>
        <span class="author">by <a>John Doe Hastings</a></span>
      </p>
    </header>
    <section>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur,
        delectus autem cumque id, quae porro tempore iste hic sit, consectetur
        reprehenderit voluptatem. Ducimus nihil modi omnis illum aliquam
        architecto, excepturi.
      </p>
    </section>
    <footer>
      <p><i class="far fa-clock"></i> 7 min read</p>
      <p><i class="fas fa-donate"></i> Subscribers Only</p>
    </footer>
  </article>
</template>

<style scoped>
article {
  flex-basis: 33%;
  padding: var(--spacing) var(--spacing-double);
}

article:hover {
  cursor: pointer;
  transform: scale(1.02);
  background-color: var(--color-white);
  filter: drop-shadow(0 0 var(--spacing-half) var(--color-grey));
}

article:hover h3 {
  color: var(--color-blue);
  cursor: pointer;
}

time {
  font-size: var(--small);
  color: var(--color-grey);
  font-style: italic;
  text-align: right;
  display: block;
}

h3 {
  font-weight: bold;
  padding: var(--spacing-half) 0;
  margin: var(--spacing-half) 0 var(--spacing);
  line-height: var(--line-height-body);
  display: inline;
  text-decoration: none;
  background-image: linear-gradient(var(--color-black), var(--color-black));
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: center bottom 29%;
  background-origin: padding-box;
  text-shadow: var(--color-cream) 3px 0, var(--color-cream) 2px 0,
    var(--color-cream) 1px 0, var(--color-cream) 0px 0,
    var(--color-cream) -1px 0, var(--color-cream) -2px 0,
    var(--color-cream) 3px 0;
}

footer {
  color: var(--color-grey);
  font-size: var(--small);
}

footer > p {
  margin-bottom: var(--spacing-half);
}

.author {
  color: var(--color-grey);
  display: inline;
}

.author > a {
  cursor: pointer;
  font-weight: bold;
  display: inline;
  text-decoration: none;
  background-image: linear-gradient(var(--color-grey), var(--color-grey));
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: center bottom 8%;
  background-origin: padding-box;
  text-shadow: var(--color-cream) 3px 0, var(--color-cream) 2px 0,
    var(--color-cream) 1px 0, var(--color-cream) 0px 0,
    var(--color-cream) -1px 0, var(--color-cream) -2px 0,
    var(--color-cream) 3px 0;
}
</style>
