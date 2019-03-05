<template>
  <form :class="{ contentTooLong, contentOverThreshold, contentExists }">
    <label>
      <textarea
        v-model="text"
        v-autosize="text"
        placeholder="Post to your log"
        rows="1"
      ></textarea>
    </label>
    <span class="counter">{{ charCount }} / {{ maxChars }}</span>
    <footer>
      <button :disabled="contentTooLong" @click.prevent="submit">Post</button>
    </footer>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: function() {
    return {
      text: '',
      maxChars: 200,
      threshold: 0.8
    };
  },
  computed: {
    charCount() {
      return this.text.length;
    },
    contentExists() {
      return this.charCount > 0;
    },
    contentOverThreshold() {
      return this.charCount > this.maxChars * this.threshold;
    },
    contentTooLong() {
      return this.charCount > this.maxChars;
    }
  },
  methods: {
    ...mapActions(['fetchFeed']),
    async submit() {
      if (this.contentExists && !this.contentTooLong) {
        const response = await this.$http.post('/feed/create', {
          content: this.text
        });

        if (response.status === 200) {
          this.text = '';
          this.fetchFeed();
        } else {
          // TODO: Add some error handling right here.
        }
      }
    }
  }
};
</script>

<style scoped>
form {
  background-color: var(--color-black);
  padding: 0 var(--spacing);
}

textarea {
  box-shadow: inset 0 0 var(--spacing-half) var(--color-black);
  background-color: var(--color-grey);
  color: var(--color-white);
  font-size: var(--small);
  border-radius: var(--spacing-half);
}

textarea:focus {
  background-color: var(--color-white);
  color: var(--color-black);
  min-height: 4em;
}

button {
  opacity: 0;
}

.contentExists button {
  opacity: 1;
}

footer {
  float: right;
}

.counter {
  font-size: var(--small);
  color: var(--color-grey);
  opacity: 0;
}

.contentTooLong .counter {
  color: var(--color-red);
}

.contentOverThreshold .counter {
  opacity: 1;
}
</style>
