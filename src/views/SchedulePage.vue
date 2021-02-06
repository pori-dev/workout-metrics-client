<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <workout-schedule-container />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import WorkoutScheduleContainer from '@/components/schedule/WorkoutScheduleContainer.vue';

export default {
  components: {
    MainLayout,
    WorkoutScheduleContainer,
  },
};
</script>
