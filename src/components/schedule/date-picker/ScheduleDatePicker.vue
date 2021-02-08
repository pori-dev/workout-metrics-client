<template>
  <v-card height="100%">
    <v-card-title class="font-weight-medium grey--text">
      Workout Schedule
    </v-card-title>

    <v-card-subtitle class="grey--text text--lighten-1 text-caption">
      (select a date to add, edit, or delete a schedule)
    </v-card-subtitle>

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

    <v-card-text
      class="pl-6 d-flex justify-space-between text-caption flex-wrap grey--text text--darken-0"
    >
      <div v-for="status in statuses" :key="status.text">
        <v-badge class="status-indicator" :color="status.color" dot left>
          <span>{{ status.text }}</span>
        </v-badge>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { STATUS_COLOR } from '@/common/enums/status-colors.enum';
import DatePicker from '@/components/common/DatePicker.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

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
  },

  data: () => ({
    prevIcon: mdiChevronLeft,
    nextIcon: mdiChevronRight,
    currentDate: new Date().toISOString().substr(0, 10),
  }),

  computed: {
    statuses() {
      return [
        {
          text: 'Todo',
          color: STATUS_COLOR['todo'],
        },
        {
          text: 'Done',
          color: STATUS_COLOR['done'],
        },
        {
          text: 'Missed',
          color: STATUS_COLOR['missed'],
        },
        {
          text: 'Indeterminate',
          color: STATUS_COLOR['indeterminate'],
        },
      ];
    },
  },

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
