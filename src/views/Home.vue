<template>
  <main-layout>
    <workout-schedule-container />
  </main-layout>
</template>

<script>
import WorkoutScheduleContainer from '@/components/workout-schedule/WorkoutScheduleContainer.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'Home',
  components: {
    MainLayout,
    WorkoutScheduleContainer,
  },
};
</script>
