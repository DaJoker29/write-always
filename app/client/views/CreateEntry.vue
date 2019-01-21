<template>
  <main>
    <textarea
      id="entry-field"
      placeholder="Start typing here"
      @keyup="autosize(document.querySelector('#entry-field'))"
    ></textarea>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
textarea {
  margin: 0;
  height: auto;
  box-sizing: border-box;
  width: 100%;
}
</style>
