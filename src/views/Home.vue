<template>
  <div class="home">
    <workout-schedule-container />
  </div>
</template>

<script>
import WorkoutScheduleContainer from '@/components/workout-schedule/WorkoutScheduleContainer.vue';

export default {
  name: 'Home',
  components: {
    WorkoutScheduleContainer,
  },
};
</script>
