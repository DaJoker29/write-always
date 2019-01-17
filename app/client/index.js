import Vue from 'vue';
import NProgress from 'nprogress';
import axios from 'axios';
import store from './store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('body');

NProgress.configure({ parent: '.site-header' });
axios.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

axios.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
