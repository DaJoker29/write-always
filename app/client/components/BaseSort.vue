<template>
  <aside>
    <h3>Order and Filter ({{ type }})</h3>
    <!--     <p
      v-for="(filter, index) in sort.filter"
      v-if="sort.filter.length"
      :key="index"
    >
      <input
        id="filter.value"
        v-model="checkedFilter"
        type="checkbox"
        value="filter.value"
      />
      <label for="filter.value">{{ filter.label }}</label>
    </p>
 -->
    <div v-if="orderBy.length" class="order-rules">
      <p v-for="rule in orderBy" :key="rule[0]">
        <input
          :id="rule[0]"
          v-model="selectedOrder"
          type="radio"
          :value="rule[0]"
          @click="setSort({ type, order: rule[0] })"
        />
        <label :for="rule[0]">{{ rule[1] }}</label>
      </p>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    orderBy: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      checkedFilter: '',
      selectedOrder: ''
    };
  },
  computed: {
    ...mapGetters(['sort'])
  },
  created() {
    this.selectedOrder = this.sort[this.type].orderBy || '';
    this.checkedFilter = this.sort[this.type].filter || '';
  },
  methods: {
    ...mapActions(['setSort'])
  }
};
</script>

<style scoped>
aside {
  flex: 100%;
}

input {
  width: auto;
  padding: 0;
  margin: 0;
}

.order-rules {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.order-rules > p {
  flex: 1;
}
</style>
