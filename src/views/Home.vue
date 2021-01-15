<template>
  <div class="home">
    <workout-schedule></workout-schedule>
  </div>
</template>

<script>
import WorkoutSchedule from '@/components/WorkoutSchedule.vue';

export default {
  name: 'Home',
  components: {
    WorkoutSchedule,
  },
};
</script>
