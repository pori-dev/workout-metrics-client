<template>
  <v-card height="100%" ref="chartContainer" class="pb-2">
    <loading-overlay :loading="loading">
      <v-card-title class="font-weight-medium grey--text" ref="chartTitle">
        Workouts Statistics
      </v-card-title>

      <schedule-statistics-chart
        :chart-data="statisticsData"
        :options="chartOptions"
        :height="320"
      />
    </loading-overlay>
  </v-card>
</template>

<script>
import ScheduleStatisticsChart from './ScheduleStatisticsChart.vue';
import { scheduleStatisticsChartOptions } from './schedule-statistics-chart-options';
import LoadingOverlay from '../../LoadingOverlay.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';
const scheduleRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    ScheduleStatisticsChart,
    LoadingOverlay,
  },

  data: () => ({
    loading: false,
    statisticsData: {},
    chartOptions: scheduleStatisticsChartOptions,
  }),

  created() {
    this.fetchStatistics();
  },

  methods: {
    fetchStatistics() {
      this.loading = true;
      scheduleRepository
        .fetchStatistics()
        .then(({ data }) => {
          this.fillStatisticsData(data);
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    fillStatisticsData(statistics) {
      const data = Object.keys(statistics).map(key => statistics[key]);
      this.statisticsData = {
        labels: ['Done', 'Missed', 'Indeterminated', 'Todo'],
        datasets: [
          {
            data,
            backgroundColor: [
              'rgba(33, 150, 243, .4)',
              'rgba(255, 235, 59, .4)',
              'rgba(244, 67, 54, .4)',
              'rgba(76, 175, 80, .4)',
            ],
            borderColor: [
              'rgba(33, 150, 243, 1)',
              'rgba(255, 235, 59, 1)',
              'rgba(244, 67, 54, 1)',
              'rgba(76, 175, 80, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    },
  },
};
</script>
