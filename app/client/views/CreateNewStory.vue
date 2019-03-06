<template>
  <main>
    <form
      :class="{
        validTitle,
        validContent,
        validDescription,
        noTitle,
        noContent,
        noDescription,
        descriptionTooLong,
        descriptionThreshold,
        subscribersOnly,
        titleTooLong,
        titleThreshold
      }"
    >
      <input v-model="title" type="text" placeholder="Title" class="title" />
      <Transition name="fade">
        <small v-if="titleTooLong"
          >Keep titles under {{ maxTitleLen }} characters.</small
        >
      </Transition>
      <textarea
        v-model="content"
        v-autosize="content"
        class="content"
        placeholder="Once upon a time..."
      ></textarea>
      <small>*This field accepts Markdown.</small>
      <div class="settings">
        <label
          ><input v-model="isPremium" type="checkbox" /> Make this story
          available only to your subscribers?</label
        >
        <textarea
          v-model="description"
          rows="3"
          class="description"
          placeholder="Give a short description of your story here."
        ></textarea>
        <small v-if="descriptionThreshold" class="counter"
          >{{ description.length }} / {{ maxDescriptionLen }}</small
        >
        <p>
          <button :disabled="!readyToSubmit" @click.prevent="submit">
            Submit
          </button>
        </p>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data: function() {
    return {
      content: '',
      title: '',
      description: '',
      isPremium: false,
      minTitleLen: 2,
      maxTitleLen: 70,
      minContentLen: 10,
      maxDescriptionLen: 180,
      threshold: 0.6
    };
  },
  computed: {
    readyToSubmit() {
      return this.validTitle && this.validContent && this.validDescription;
    },
    validTitle() {
      return (
        this.title.length >= this.minTitleLen &&
        this.title.length <= this.maxTitleLen
      );
    },
    validContent() {
      return this.content.length > this.minContentLen;
    },
    validDescription() {
      return this.description.length <= this.maxDescriptionLen;
    },
    noTitle() {
      return this.title.length === 0;
    },
    noContent() {
      return this.content.length === 0;
    },
    noDescription() {
      return this.description.length === 0;
    },
    descriptionTooLong() {
      return this.description.length > this.maxDescriptionLen;
    },
    descriptionThreshold() {
      return this.description.length > this.maxDescriptionLen * this.threshold;
    },
    titleTooLong() {
      return this.title.length > this.maxTitleLen;
    },
    titleThreshold() {
      return this.title.length > this.maxTitleLen * this.threshold;
    },
    subscribersOnly() {
      return this.isPremium;
    }
  },
  methods: {
    async submit() {
      const { validContent, validTitle, validDescription } = this;
      if (validContent && validTitle && validDescription) {
        const { title, content, isPremium, description } = this;
        const response = await this.$http.post('/story/create', {
          content,
          title,
          isPremium,
          description
        });

        if (response.status === 200) {
          this.$router.push('/');
        } else {
          // TODO: Add some error handling right here.
        }
      }
    }
  }
};
</script>

<style scoped>
input,
textarea {
  margin: var(--spacing) 0;
  padding: 0;
  background: transparent;
  color: var(--color-black);
}

small {
  font-size: var(--small);
  color: var(--color-grey);
  font-style: italic;
  float: right;
}

form {
  margin: var(--spacing) var(--spacing-double);
}

input {
  font-size: var(--h2);
}

input:focus {
  box-shadow: none;
}

.settings {
  margin-left: var(--spacing-double);
}

.content,
.title {
  color: var(--color-red);
}

.description {
  color: var(--color-black);
}

.noDescription .description {
  color: var(--color-blue);
}

.validContent > .content,
.validTitle > .title {
  color: var(--color-black);
}

.counter,
.title-counter {
  padding: var(--spacing-half);
  border: 1px solid;
}

.descriptionTooLong .counter {
  color: var(--color-red);
}

.titleTooLong .title-counter {
  color: var(--color-red);
}
</style>
