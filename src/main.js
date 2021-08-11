import Vue from 'vue';
import Flicking from '@egjs/vue-flicking';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import '@egjs/vue-flicking/dist/flicking.css';

Vue.config.productionTip = false;
Vue.use(Flicking);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
