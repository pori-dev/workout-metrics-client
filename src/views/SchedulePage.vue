<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <schedule-date-picker-container />
      </v-col>

      <v-col cols="12" md="5">
        <schedule-generator-container />
      </v-col>

      <v-col cols="12" md="3">
        <schedule-statistics />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import ScheduleDatePickerContainer from '@/components/schedule/date-picker/ScheduleDatePickerContainer.vue';
import ScheduleGeneratorContainer from '@/components/schedule/generator/ScheduleGeneratorContainer.vue';
import ScheduleStatistics from '@/components/schedule/statistics/ScheduleStatistics.vue';

export default {
  components: {
    MainLayout,
    ScheduleDatePickerContainer,
    ScheduleGeneratorContainer,
    ScheduleStatistics,
  },
};
</script>
