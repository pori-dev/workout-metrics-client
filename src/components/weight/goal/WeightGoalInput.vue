<template>
  <v-text-field
    v-model.trim="weight"
    label="Goal Weight"
    suffix="kg"
    :prepend-icon="scaleIcon"
    placeholder="80.3"
    @blur="$emit('blur')"
    @input="$emit('setWeight', $event)"
    messages="A number with maximum 1 decimal point. like: 80 or 80.3"
    :error-messages="errors"
  />
</template>

<script>
import { mdiScale } from '@mdi/js';

export default {
  props: {
    errors: {
      default: '',
      type: String,
    },
  },

  data: () => ({
    weight: null,
    scaleIcon: mdiScale,
  }),
};
</script>

<style></style>
