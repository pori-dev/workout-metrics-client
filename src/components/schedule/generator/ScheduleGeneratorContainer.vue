<template>
  <div>
    <app-card>
      <template #title>
        Generate Recurring Schedules
      </template>

      <template #subtitle>
        Generate to-do schedules for a specified duration
      </template>

      <template #text>
        <schedule-generator />
      </template>
    </app-card>

    <schedule-generator-dialog v-if="showScheduleGeneratorDialog" />
  </div>
</template>

<script>
import ScheduleGenerator from './ScheduleGenerator.vue';
import ScheduleGeneratorDialog from './ScheduleGeneratorDialog.vue';
import AppCard from '@/components/common/AppCard.vue';

export default {
  components: {
    ScheduleGenerator,
    ScheduleGeneratorDialog,
    AppCard,
  },

  computed: {
    showScheduleGeneratorDialog() {
      return (
        this.$store.state.dialog.dialogComponentName === 'scheduleGenerator'
      );
    },
  },
};
</script>
