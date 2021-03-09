<template>
  <chart-card>
    <template #chartTitle>
      Workout Statistics
    </template>

    <template #chart="chartStyle">
      <loading-overlay :loading="loading">
        <schedule-statistics-chart
          :chart-data="statisticsData"
          :options="chartOptions"
          :styles="chartStyle"
        />
      </loading-overlay>
    </template>
  </chart-card>
</template>

<script>
import ScheduleStatisticsChart from './ScheduleStatisticsChart.vue';
import { scheduleStatisticsChartOptions } from './schedule-statistics-chart-options';
import ChartCard from '@/components/common/ChartCard.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';
const scheduleRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    ScheduleStatisticsChart,
    LoadingOverlay,
    ChartCard,
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
              'rgba(76, 175, 80, .4)',
              'rgba(244, 67, 54, .4)',
              'rgba(255, 235, 59, .4)',
              'rgba(33, 150, 243, .4)',
            ],
            borderColor: [
              'rgba(76, 175, 80, 1)',
              'rgba(244, 67, 54, 1)',
              'rgba(255, 235, 59, 1)',
              'rgba(33, 150, 243, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    },
  },
};
</script>
