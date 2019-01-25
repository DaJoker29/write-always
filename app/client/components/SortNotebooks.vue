<template>
  <BaseSort :type="type" :filters="filters" :order-by="orderBy" />
</template>

<script>
import BaseSort from './BaseSort';

export default {
  components: {
    BaseSort
  },
  data: function() {
    return {
      type: 'notebooks',
      filters: [['author', 'Author']],
      orderBy: [
        ['date', 'Date Created'],
        ['recent', 'Date of Last Update'],
        ['alphabetical', 'A-Z']
      ]
    };
  }
};
</script>
