export default {
  namespaced: true,

  state: () => ({
    snackbar: {
      visible: false,
      text: null,
      timeout: 5000,
      multiline: false,
    },
  }),

  mutations: {
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text;
      state.snackbar.visible = true;
      if (payload.timeout) this.state.timeout = payload.timeout;
    },

    closeSnackbar(state) {
      state.snackbar.text = null;
      state.snackbar.visible = false;
      state.snackbar.timeout = 5000;
      state.snackbar.multiline = false;
    },
  },
};
