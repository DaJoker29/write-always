<template>
  <article>{{ notebook }}</article>
</template>

<script>
export default {
  props: {
    notebook: {
      type: Object,
      required: true
    }
  }
};
</script>
