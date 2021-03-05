<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <schedule-date-picker-container />
      </v-col>

      <v-col cols="12" md="8">
        <weights-chart-container />
      </v-col>

      <v-col cols="12" md="9">
        <schedule-statistics-chart-container />
      </v-col>

      <v-col cols="12" md="3">
        <schedule-statistics />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import ScheduleDatePickerContainer from '@/components/schedule/date-picker/ScheduleDatePickerContainer.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import WeightsChartContainer from '@/components/weight/WeightsChartContainer.vue';
import ScheduleStatisticsChartContainer from '@/components/schedule/statistics/ScheduleStatisticsChartContainer.vue';
import ScheduleStatistics from '@/components/schedule/statistics/ScheduleStatistics.vue';

export default {
  name: 'Home',
  components: {
    MainLayout,
    ScheduleDatePickerContainer,
    WeightsChartContainer,
    ScheduleStatisticsChartContainer,
    ScheduleStatistics,
  },
};
</script>
