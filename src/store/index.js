import Vue from 'vue';
import Vuex from 'vuex';
import snackbar from './modules/snackbar.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {},
  modules: {
    snackbar,
  },
});
