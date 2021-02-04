<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <weights-date-picker-container />
      </v-col>
      <v-col cols="12" md="8">
        <weights-chart-container />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import WeightsDatePickerContainer from '@/components/weight/WeightsDatePickerContainer.vue';
import WeightsChartContainer from '@/components/weight/WeightsChartContainer.vue';

export default {
  components: {
    WeightsDatePickerContainer,
    WeightsChartContainer,
    MainLayout,
  },
};
</script>

<style></style>
