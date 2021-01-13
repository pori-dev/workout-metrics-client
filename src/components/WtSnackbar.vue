<template>
  <div>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :multi-line="snackbar.multiline === true"
      >{{ snackbar.text }}</v-snackbar
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WtSnackbar',
  computed: {
    ...mapState({
      snackbar: state => state.snackbar.snackbar,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
