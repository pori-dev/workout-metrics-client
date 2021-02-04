<template>
  <v-card>
    <v-toolbar flat class="font-weight-medium grey--text">
      Workout Scheduls
    </v-toolbar>

    <v-date-picker
      v-model="currentDate"
      :events="eventsIndicator"
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
import { STATUS_COLOR } from '@/common/enums/status-colors.enum';

export default {
  props: {
    schedules: {
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
    eventsIndicator(date) {
      let eventColor = null;
      this.schedules.forEach(schedule => {
        if (schedule.date === date) {
          eventColor = STATUS_COLOR[schedule.status] || false;
        }
      });
      return eventColor;
    },
  },
};
</script>

<style></style>
