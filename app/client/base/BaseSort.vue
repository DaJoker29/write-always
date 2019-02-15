<template>
  <aside>
    <div v-if="orderBy.length" class="order-rules">
      <p v-for="rule in orderBy" :key="rule[0]" class>
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
    }
  },
  data: function() {
    return {
      selectedOrder: ''
    };
  },
  computed: {
    ...mapGetters(['sort'])
  },
  created() {
    this.selectedOrder = this.sort[this.type].orderBy || '';
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
  width: var(--small);
  height: var(--small);
  background-color: var(--color-grey);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input,
label {
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

label {
  font-size: var(--small);
}

input:focus {
  box-shadow: none;
}

input:checked {
  background-color: var(--color-black);
}

.order-rules {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
}

.order-rules > p {
  flex: 0 1 auto;
  margin-right: var(--spacing);
}
</style>
