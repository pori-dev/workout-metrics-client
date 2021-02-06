<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <workout-schedule-date-picker-container />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import WorkoutScheduleDatePickerContainer from '@/components/schedule/WorkoutScheduleDatePickerContainer.vue';

export default {
  components: {
    MainLayout,
    WorkoutScheduleDatePickerContainer,
  },
};
</script>
