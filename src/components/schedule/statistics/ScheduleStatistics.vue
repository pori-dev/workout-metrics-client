<template>
  <app-card>
    <template #title>
      Workout Statistics
    </template>

    <template #text>
      <loading-overlay :loading="loading">
        <schedule-statuses :counts="counts" />
      </loading-overlay>
    </template>
  </app-card>
</template>

<script>
import ScheduleStatuses from '@/components/schedule/ScheduleStatuses.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';
import AppCard from '@/components/common/AppCard.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';

const scheduleRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    ScheduleStatuses,
    LoadingOverlay,
    AppCard,
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
