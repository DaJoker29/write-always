<template>
  <main>
    <FacebookLogin />
    <!-- Google Login will go here -->
  </main>
</template>

<script>
export default {
  components: {
    FacebookLogin: () => import('@client/modules/FacebookLogin')
  }
};
</script>
