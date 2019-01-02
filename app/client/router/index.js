import Vue from 'vue';
import Router from 'vue-router';

import Home from '@app/client/components/Home';
import LoginPage from '@app/client/components/LoginPage';

Vue.use(Router);

const router = new Router({
  // TODO: Add mode: 'history' to remove # from URLs. Need server support. Read here: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  // mode: 'history',
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
