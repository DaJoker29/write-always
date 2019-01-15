import Vue from 'vue';
import Router from 'vue-router';

import Home from '@client/views/Home';
import LoginPage from '@client/views/Login';
import PageNotFound from '@client/views/PageNotFound';
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
      path: '404',
      alias: '*',
      name: 'notFound',
      component: PageNotFound
    }
  ]
});

// Block access to login when logged in.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next({ name: 'notFound' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
