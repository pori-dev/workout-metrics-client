import Vue from 'vue';
import Vuex from 'vuex';
import snackbar from './modules/snackbar';
import scheduleGenerator from './modules/schedule-generator';
import dialog from './modules/dialog';

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
    scheduleGenerator,
    dialog,
  },
});
