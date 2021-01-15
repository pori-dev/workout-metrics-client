<template>
  <v-row justify="space-between">
    <v-col cols="12" md="6">
      <v-date-picker
        v-model="date"
        :events="functionEvent"
        :prev-icon="prevIcon"
        :next-icon="nextIcon"
        full-width
        color="accent"
        elevation="1"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

export default {
  data: () => ({
    prevIcon: mdiChevronLeft,
    nextIcon: mdiChevronRight,
    date: new Date().toISOString().substr(0, 10),
    // TODO: replace it with response from API
    scheduledSessions: ['2021-01-15', '2021-01-24', '2021-01-25'],
    // TODO: replace it with response from API
    missedSessions: ['2021-01-08', '2021-01-02'],
  }),
  methods: {
    functionEvent(date) {
      if (this.scheduledSessions.includes(date)) {
        return 'blue';
      }
      if (this.missedSessions.includes(date)) {
        return 'red';
      }
      return false;
    },
  },
};
</script>
