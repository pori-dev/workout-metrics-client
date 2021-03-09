<template>
  <app-card height="100%">
    <template #title>
      Workout Schedule
    </template>

    <template #subtitle>
      (select a date to add, edit, or delete a schedule)
    </template>

    <template #text>
      <loading-overlay :loading="loading">
        <date-picker
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
      </loading-overlay>

      <schedule-statuses
        class="d-flex justify-space-between text-caption flex-wrap grey--text text--darken-0"
      />
    </template>
  </app-card>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { STATUS_COLOR } from '@/common/enums/status-colors.enum';
import AppCard from '@/components/common/AppCard.vue';

import DatePicker from '@/components/common/DatePicker.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';
import ScheduleStatuses from '@/components/schedule/ScheduleStatuses.vue';

export default {
  props: {
    schedules: {
      default: () => [],
      type: Array,
    },

    loading: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    DatePicker,
    LoadingOverlay,
    ScheduleStatuses,
    AppCard,
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

<style lang="scss" scoped>
.status-indicator ::v-deep .v-badge__badge {
  inset: 2px 0 0 -12px !important;
}
</style>
