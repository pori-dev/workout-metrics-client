<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <workout-schedule-container />
      </v-col>
      <v-col cols="12" md="8">
        <weights-chart-container />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import WorkoutScheduleContainer from '@/components/schedule/WorkoutScheduleContainer.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import WeightsChartContainer from '@/components/weight/WeightsChartContainer.vue';

export default {
  name: 'Home',
  components: {
    MainLayout,
    WorkoutScheduleContainer,
    WeightsChartContainer,
  },
};
</script>
