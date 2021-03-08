<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <schedule-date-picker-container />
      </v-col>

      <v-col cols="12" md="8">
        <weights-chart-container />
      </v-col>

      <v-col cols="12" md="8">
        <schedule-statistics-chart-container />
      </v-col>

      <v-col cols="12" md="4">
        <schedule-statistics class="mb-4" />

        <weight-goal-details />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import ScheduleDatePickerContainer from '@/components/schedule/date-picker/ScheduleDatePickerContainer.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import WeightsChartContainer from '@/components/weight/chart/WeightsChartContainer.vue';
import ScheduleStatisticsChartContainer from '@/components/schedule/statistics/ScheduleStatisticsChartContainer.vue';
import ScheduleStatistics from '@/components/schedule/statistics/ScheduleStatistics.vue';
import WeightGoalDetails from '../components/weight/goal/WeightGoalDetails.vue';

export default {
  name: 'Home',
  components: {
    MainLayout,
    ScheduleDatePickerContainer,
    WeightsChartContainer,
    ScheduleStatisticsChartContainer,
    ScheduleStatistics,
    WeightGoalDetails,
  },
};
</script>
