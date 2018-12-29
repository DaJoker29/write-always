import Vue from 'vue';
import store from './store';
import App from './App';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('body');
