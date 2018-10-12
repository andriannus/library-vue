import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Meta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(Meta);

axios.defaults.baseURL = 'http://localhost:3030/';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
