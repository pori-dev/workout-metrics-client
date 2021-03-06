<template>
  <v-card height="100%" class="pb-2">
    <v-card-title class="font-weight-medium grey--text">
      Submitted Weights
    </v-card-title>

    <v-card-subtitle class="grey--text text--lighten-1 text-caption">
      (select a date to add, edit, or delete a weight recrod)
    </v-card-subtitle>
    <date-picker
      v-model="currentDate"
      :events="weightRecordIndicator"
      :allowed-dates="allowedDates"
      :prev-icon="prevIcon"
      :next-icon="nextIcon"
      no-title
      full-width
      color="accent"
      @click:date="$emit('select-date', $event)"
      @update:picker-date="$emit('picker-date', $event)"
    />
  </v-card>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { isAfter, parseISO } from 'date-fns';
import DatePicker from '@/components/common/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },

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
        if (weight.date === date) return 'blue lighten-2';
      }
    },

    allowedDates(date) {
      const parsedDate = parseISO(date);
      return !isAfter(parsedDate, new Date());
    },
  },
};
</script>
