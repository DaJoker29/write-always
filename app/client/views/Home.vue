<template>
  <div>
    <aside class="intro">
      <p>
        Welcome! We are a community of writers and readers who are passionate
        about storytelling. Here we share our stories for the public at large.
      </p>
      <p>
        Currently, we are invite-only so if you would like to join,
        <a href=""> please contact one of our admins. </a>
      </p>
    </aside>
    <main>
      <TheSidebar
        v-if="isLoggedIn && Object.entries(user).length > 0"
        :user="user"
      />
      <NotebookList :notebooks="notebooks" />
    </main>
  </div>
</template>

<script>
import NotebookList from '@client/components/NotebookList';
import TheSidebar from '@client/components/TheSidebar';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    NotebookList,
    TheSidebar
  },
  data: function() {
    return {
      notebooks: [],
      user: {}
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['uid'])
  },
  created: async function() {
    this.notebooks = await this.fetchNotebooks();
    this.user = await this.fetchUser();
  },
  methods: {
    fetchNotebooks: async function() {
      return (await this.$http.get('/notebooks')).data;
    },
    fetchUser: async function() {
      return (await this.$http.get(`/user/${this.uid}`)).data;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-flow: row wrap;
  margin: 0;
}

main > /deep/ * {
  padding: var(--spacing);
}

main > /deep/ aside {
  flex: 1;
}

main > /deep/ section {
  flex: 3;
}

.intro {
  padding: var(--spacing-half) var(--spacing);
  background-color: var(--color-red);
  color: var(--color-black);
  text-align: center;
}

.intro a:link,
.intro a:visited {
  color: var(--color-black);
}

.intro a:hover,
.intro a:focus,
.intro a:active {
  color: var(--color-blue);
}
</style>
