import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@client/store';

const Home = () => import('@client/views/Home');
const LoginPage = () => import('@client/views/Login');
const AuthorsPage = () => import('@client/views/Authors');
const PageNotFound = () => import('@client/views/PageNotFound');
const SingleAuthorPage = () => import('@client/views/SingleAuthor');
const SingleNotebookPage = () => import('@client/views/SingleNotebook');
const CreateNotebookPage = () => import('@client/views/CreateNotebook');
const CreateEntryPage = () => import('@client/views/CreateEntry');

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
