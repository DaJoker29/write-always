import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@client/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'signUp',
      component: () => import('@client/views/SignUp'),
      // TODO: Switch to ^this^ format for the rest of these
      meta: {
        user: false
      }
    },
    {
      path: '/new-story',
      name: 'newStory',
      component: () => import('@client/views/CreateNewStory'),
      meta: {
        user: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@client/views/Home')
    },
    {
      path: '/authors',
      name: 'authors',
      component: () => import('@client/views/Authors')
    },
    {
      path: '404',
      alias: '*',
      name: 'notFound',
      component: () => import('@client/views/PageNotFound')
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
