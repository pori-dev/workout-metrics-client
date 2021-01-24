<template>
  <v-date-picker
    v-model="currentDate"
    :events="eventsIndicator"
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
