import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

import Home from '@client/views/Home';
import LoginPage from '@client/views/Login';
import AuthorsPage from '@client/views/Authors';
import NotebooksPage from '@client/views/Notebooks';
import PageNotFound from '@client/views/PageNotFound';
import SingleAuthorPage from '@client/views/SingleAuthor';
import SingleNotebookPage from '@client/views/SingleNotebook';
import CreateNotebookPage from '@client/views/CreateNotebook';
import CreateEntryPage from '@client/views/CreateEntry';
import store from '@client/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: NotebooksPage
    },
    {
      path: '/author/:authorID',
      name: 'author',
      component: SingleAuthorPage
    },
    {
      path: '/notebook/:notebookID',
      name: 'notebook',
      component: SingleNotebookPage
    },
    {
      path: '/notebook/create',
      name: 'createNotebook',
      component: CreateNotebookPage,
      meta: {
        user: true
      }
    },
    {
      path: '/entry/create',
      name: 'createEntry',
      component: CreateEntryPage,
      meta: {
        user: true
      }
    },
    {
      path: '404',
      alias: '*',
      name: 'notFound',
      component: PageNotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next({ name: 'notFound' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next({ name: 'notFound' });
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
