<template>
  <app-dialog>
    <template #dialogTitle>
      Schedule generator
    </template>

    <template #dialogBody>
      <p class="mb-8">
        You are about to add to-do schedule for each
        {{ formattedSelectedWeekdays }} for next {{ formattedPeriod }}.
      </p>
      <v-alert :icon="alertIcon" type="warning" outlined dense>
        All your to-dos that are already set will be removed.
      </v-alert>
    </template>

    <template #dialogActions>
      <v-btn text @click="generateScheduleHandler">
        Add
      </v-btn>

      <v-btn text @click="hideDialog">
        Cancel
      </v-btn>
    </template>
  </app-dialog>
</template>

<script>
import { mdiAlert } from '@mdi/js';
import AppDialog from '@/components/common/AppDialog.vue';
import { mapActions, mapMutations } from 'vuex';

const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const PERIODS_TEXT = ['week', 'month', '3 months', '6 months', '1 year'];

export default {
  components: { AppDialog },

  data: () => ({
    alertIcon: mdiAlert,
  }),

  computed: {
    formattedSelectedWeekdays() {
      let weekdays = this.$store.state.scheduleGenerator.selectedWeekdays;
      weekdays = weekdays.sort((a, b) => a - b);

      if (weekdays.length === 1) {
        return WEEK_DAYS[weekdays];
      } else if (weekdays.length === 2) {
        return weekdays.map(weekday => WEEK_DAYS[weekday]).join(' and ');
      } else {
        // creates a format like this:
        // 'Sunday, Monday, Tuesday and Wednesday'
        const weekdaysTextArr = weekdays.map(weekday => WEEK_DAYS[weekday]);
        const lastWeekdayTextItem = weekdaysTextArr.length - 1;

        let weekdaysStr = weekdaysTextArr
          .slice(0, lastWeekdayTextItem)
          .join(', ');

        weekdaysStr += ' and ' + weekdaysTextArr[lastWeekdayTextItem];

        return weekdaysStr;
      }
    },

    formattedPeriod() {
      const periodIndex = this.$store.state.scheduleGenerator.selectedPeriod;

      return PERIODS_TEXT[periodIndex];
    },
  },

  methods: {
    ...mapActions('scheduleGenerator', ['generateSchedule']),
    ...mapMutations('dialog', ['hideDialog']),
    generateScheduleHandler() {
      this.hideDialog();
      this.generateSchedule();
    },
  },
};
</script>
