<template>
  <div :class="[todo.completed ? 'completed' : '']">
    <a v-if="!todo.completed" @click="completeTodo(todo._id)">
      <i class="fa fa-check"></i>
    </a>
    <span> {{ todo.text }} </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['completeTodo'])
  }
};
</script>

<style scoped>
div {
  clear: both;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 1.5em;
  margin: var(--spacing-half) 0;
}

span {
  display: inline-block;
  flex: 1;
  text-decoration: underline dashed var(--color-grey);
  text-decoration-skip-ink: auto;
  font-style: italic;
}

a {
  margin-right: var(--spacing);
  color: var(--color-green);
  cursor: pointer;
}

a:hover,
a:active {
  color: var(--color-blue);
}

.completed {
  margin: 0;
}

.completed > span {
  text-decoration: line-through;
  color: var(--color-grey);
  font-size: var(--small);
  padding: 0;
}
</style>
