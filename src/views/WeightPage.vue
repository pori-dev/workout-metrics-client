<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <weights-date-picker-container />
      </v-col>

      <v-col cols="12" md="8">
        <weights-chart-container />
      </v-col>

      <v-col cols="12" md="4">
        <weight-goal-setter />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import WeightsDatePickerContainer from '@/components/weight/date-picker/WeightsDatePickerContainer.vue';
import WeightsChartContainer from '@/components/weight/chart/WeightsChartContainer.vue';
import WeightGoalSetter from '../components/weight/goal/WeightGoalSetter.vue';

export default {
  components: {
    WeightsDatePickerContainer,
    WeightsChartContainer,
    MainLayout,
    WeightGoalSetter,
  },
};
</script>

<style></style>
