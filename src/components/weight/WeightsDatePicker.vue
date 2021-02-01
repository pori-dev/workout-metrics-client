<template>
  <v-date-picker
    v-model="currentDate"
    :events="weightRecordIndicator"
    :allowed-dates="allowedDates"
    :prev-icon="prevIcon"
    :next-icon="nextIcon"
    full-width
    color="accent"
    elevation="1"
    @click:date="$emit('select-date', $event)"
    @update:picker-date="$emit('picker-date', $event)"
  />
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { isAfter, parseISO } from 'date-fns';

export default {
  props: {
    weights: {
      default: () => [],
      type: Array,
    },
  },

  data: () => ({
    prevIcon: mdiChevronLeft,
    nextIcon: mdiChevronRight,
    currentDate: new Date().toISOString().substr(0, 10),
  }),

  methods: {
    weightRecordIndicator(date) {
      for (let weight of this.weights) {
        if (weight.measurementDate === date) return 'blue';
      }
    },

    allowedDates(date) {
      const parsedDate = parseISO(date);
      return !isAfter(parsedDate, new Date());
    },
  },
};
</script>
