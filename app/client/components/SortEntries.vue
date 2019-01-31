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
      type: 'entries',
      orderBy: [['newest', 'Newest'], ['oldest', 'Oldest']]
    };
  }
};
</script>
