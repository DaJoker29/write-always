import Vue from 'vue';
import Router from 'vue-router';

import Home from '@client/views/Home';
import LoginPage from '@client/views/Login';
import PageNotFound from '@client/views/PageNotFound';

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
      component: LoginPage
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
});

export default router;
