<template>
  <section>
    <h2>{{ author.displayName }}</h2>
    <p>{{ author.location }}</p>
  </section>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  }
};
</script>
