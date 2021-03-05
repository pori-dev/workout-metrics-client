<template>
  <v-menu
    v-model="isDatePickerOpen"
    :close-on-content-click="true"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Select your goal date"
        :prepend-icon="calendarIcon"
        readonly
        v-bind="attrs"
        @blur="$emit('blur')"
        :error-messages="error"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="emitDate(date)" />
  </v-menu>
</template>

<script>
import { mdiCalendar } from '@mdi/js';

export default {
  props: {
    error: {
      default: '',
      type: String,
    },
  },

  data: () => ({
    date: null,
    isDatePickerOpen: false,
    calendarIcon: mdiCalendar,
  }),

  methods: {
    emitDate(date) {
      this.$emit('setDate', date);
    },
  },
};
</script>
