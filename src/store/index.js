import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import cast from './modules/cast';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    cast,
  },
});
