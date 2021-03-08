<template>
  <div>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :multi-line="snackbar.multiline"
      >{{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn @click="closeSnackbar" v-bind="attrs" text>
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppSnackbar',
  computed: {
    ...mapState({
      snackbar: state => state.snackbar.snackbar,
    }),
  },
  methods: {
    ...mapMutations('snackbar', ['closeSnackbar']),
  },
};
</script>

<style lang="scss" scoped></style>
