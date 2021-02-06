<template>
  <v-dialog v-model="isDialogVisible" width="600"> </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    isDialogVisible: {
      get() {
        return this.dialog;
      },
      set(newValue) {
        this.$emit('update:dialog', newValue);
      },
    },
  },
};
</script>
