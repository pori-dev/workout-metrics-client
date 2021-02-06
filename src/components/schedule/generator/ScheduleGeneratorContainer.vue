<template>
  <div>
    <schedule-generator />
    <schedule-generator-dialog v-if="dialog" :dialog.sync="dialog" />
  </div>
</template>

<script>
import ScheduleGenerator from './ScheduleGenerator.vue';
import ScheduleGeneratorDialog from './ScheduleGeneratorDialog.vue';

export default {
  components: {
    ScheduleGenerator,
    ScheduleGeneratorDialog,
  },

  data: () => ({
    dialog: false,
  }),
};
</script>
