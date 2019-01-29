import Vue from 'vue';
import NProgress from 'nprogress';
import moment from 'moment';
import autosize from 'autosize';
import VueAutosize from 'vue-autosize';
import store from './store';
import App from './App';
import router from './router';
import http from './http-common';

Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.prototype.autosize = autosize;
Vue.prototype.$http = http;

Vue.use(VueAutosize);

export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('body');

NProgress.configure({ parent: '.site-header' });
