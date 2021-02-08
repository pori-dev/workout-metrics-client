<template>
  <v-card height="100%">
    <v-card-title class="font-weight-medium grey--text">
      Generate Recurring Schedules
    </v-card-title>

    <v-card-subtitle class="grey--text text--lighten-1 text-caption">
      Generate to-do schedules for a specified duration
    </v-card-subtitle>

    <v-card-text>
      <schedule-generator @generate="generateSchedule" />
    </v-card-text>

    <schedule-generator-dialog
      v-if="dialog"
      :dialog.sync="dialog"
      @generate-schedule="generateSchedule"
    />
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import ScheduleGenerator from './ScheduleGenerator.vue';
import ScheduleGeneratorDialog from './ScheduleGeneratorDialog.vue';

export default {
  components: {
    ScheduleGenerator,
    ScheduleGeneratorDialog,
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
