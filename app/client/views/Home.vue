<template>
  <div>
    <Intro />
    <HomeFeed />
  </div>
</template>

<script>
import Intro from '@client/components/Intro';
import HomeFeed from '@client/components/HomeFeed';

export default {
  components: {
    Intro,
    HomeFeed
  }
};
</script>
