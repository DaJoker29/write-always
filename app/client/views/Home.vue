<template>
  <div>
    <Intro />
    <MainFeed />
  </div>
</template>

<script>
import Intro from '@client/components/Intro';
import MainFeed from '@client/components/MainFeed';

export default {
  components: {
    Intro,
    MainFeed
  }
};
</script>
