<template>
  <aside>
    <small>3 Users Currently Active</small>
    <ul>
      <li class="active">User #1</li>
      <li class="active">User #2</li>
      <li>User #3</li>
      <li class="active">User #4</li>
      <li>User #5</li>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  padding: var(--spacing);
}

ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin: var(--spacing-half) 0;
}

ul > li {
  margin: 0 var(--spacing-half);
  padding: 0 var(--spacing-half);
  font-size: var(--small);
  display: inline;
  border-radius: var(--spacing-half);
  background-color: var(--color-grey);
  color: var(--color-white);
}

.active {
  background-color: var(--color-blue);
}

small {
  display: block;
  color: var(--color-grey);
  font-style: italic;
  text-align: right;
}
</style>
