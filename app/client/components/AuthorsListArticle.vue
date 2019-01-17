<template>
  <article>{{ author }}</article>
</template>

<script>
export default {
  props: {
    author: {
      type: Array,
      required: true
    }
  }
};
</script>
