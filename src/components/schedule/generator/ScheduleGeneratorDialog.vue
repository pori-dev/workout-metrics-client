<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogVisible" width="600">
      <v-card>
        <v-card-title class="headline">
          Schedule generator
        </v-card-title>
        <v-card-text>
          <p class="mb-8">
            You are about to add to-do schedule for each
            {{ this.formattedSelectedWeekdays }} for next
            {{ this.formattedPeriod }}.
          </p>
          <v-alert :icon="alertIcon" type="warning" outlined dense>
            All your to-dos that are already set will be removed.
          </v-alert>
        </v-card-text>

        <v-divider />

        <v-card-actions class="justify-end">
          <v-btn text @click="generateSchedule">
            Add
          </v-btn>

          <v-btn text @click="isDialogVisible = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiAlert } from '@mdi/js';

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
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
  },

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

    isDialogVisible: {
      get() {
        return this.dialog;
      },

      set(newValue) {
        this.$emit('update:dialog', newValue);
      },
    },
  },

  methods: {
    generateSchedule() {
      this.isDialogVisible = false;
      this.$emit('generate-schedule');
    },
  },
};
</script>
