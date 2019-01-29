<template>
  <BaseSort :type="type" :order-by="orderBy" />
</template>

<script>
import BaseSort from './BaseSort';

export default {
  components: {
    BaseSort
  },
  data: function() {
    return {
      type: 'authors',
      orderBy: [
        ['date', 'Date Joined'],
        ['recent', 'Date of Last Activity'],
        ['alphabetical', 'A-Z']
      ]
    };
  }
};
</script>
