import Vue from 'vue';
import Router from 'vue-router';

import Home from '@client/views/Home';
import LoginPage from '@client/views/Login';

Vue.use(Router);

const router = new Router({
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
    }
  ]
});

export default router;
