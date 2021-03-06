<template>
  <v-card>
    <loading-overlay :loading="loading">
      <v-card-title class="font-weight-medium grey--text">
        Workout Statistics
      </v-card-title>

      <v-card-text class="pb-2">
        <schedule-statuses :counts="counts" />
      </v-card-text>
    </loading-overlay>
  </v-card>
</template>

<script>
import ScheduleStatuses from '@/components/schedule/ScheduleStatuses.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';

const scheduleRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    ScheduleStatuses,
    LoadingOverlay,
  },

  data: () => ({
    loading: false,
    counts: {},
  }),

  created() {
    this.fetchStatistics();
  },

  methods: {
    fetchStatistics() {
      this.loading = true;
      scheduleRepository
        .fetchStatistics()
        .then(res => {
          this.counts = res.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .status-badge {
  margin-bottom: 12px;
}
</style>
