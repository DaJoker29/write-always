<template>
  <BaseSort :type="type" :order-by="orderBy" />
</template>

<script>
import BaseSort from '@client/base/BaseSort';

export default {
  components: {
    BaseSort
  },
  data: function() {
    return {
      type: 'authors',
      orderBy: [
        ['joined', 'Date Joined'],
        ['active', 'Last Active'],
        ['alphabetical', 'A-Z']
      ]
    };
  }
};
</script>
