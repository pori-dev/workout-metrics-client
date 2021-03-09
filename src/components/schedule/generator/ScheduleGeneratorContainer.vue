<template>
  <app-card>
    <template #title>
      Generate Recurring Schedules
    </template>

    <template #subtitle>
      Generate to-do schedules for a specified duration
    </template>

    <template #text>
      <schedule-generator @generate="generateSchedule" />
    </template>

    <schedule-generator-dialog
      v-if="dialog"
      :dialog.sync="dialog"
      @generate-schedule="generateSchedule"
    />
  </app-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
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
    dialog: {
      get() {
        return this.$store.state.scheduleGenerator.showDialog;
      },

      set(value) {
        this.setShowDialog(value);
      },
    },
  },

  methods: {
    ...mapMutations('scheduleGenerator', ['setShowDialog']),

    ...mapActions('scheduleGenerator', ['generateSchedule']),
  },
};
</script>
