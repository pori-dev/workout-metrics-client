export default {
  namespaced: true,

  state: () => ({
    dialog: false,
    dialogComponentName: null,
  }),

  mutations: {
    showDialog(state, componentName) {
      state.dialog = true;
      state.dialogComponentName = componentName;
    },

    hideDialog(state) {
      state.dialog = false;
      state.dialogComponentName = null;
    },
  },
};
