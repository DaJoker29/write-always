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
      type: 'notebooks',
      orderBy: [
        ['updated', 'Last Updated'],
        ['oldest', 'Oldest'],
        ['newest', 'Newest'],
        ['alphabetical', 'A-Z']
      ]
    };
  }
};
</script>
