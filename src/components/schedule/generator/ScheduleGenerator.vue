<template>
  <div>
    <div class="pb-6">
      <h4 class="text-subtitle-1 grey--text text--darken-1">
        Weekdays:
      </h4>
      <p class="text-subtitle-2 grey--text text--lighten-1">
        Hint: You can select multiple days.
      </p>

      <v-btn-toggle color="blue" v-model="selectedWeekdays" multiple>
        <v-btn v-for="(weekday, i) in weekdays" :key="i">{{ weekday }}</v-btn>
      </v-btn-toggle>
    </div>

    <div class="pb-6">
      <h4 class="text-subtitle-1 grey--text text--darken-1">Period:</h4>

      <p class="text-subtitle-2 grey--text text--lighten-1">
        Hint: Workout schedules would be generated for selected period.
      </p>
    </div>

    <div class="pb-6">
      <v-btn-toggle color="primary" v-model="selectedPeriod">
        <v-btn v-for="(period, i) in periods" :key="i">{{ period }}</v-btn>
      </v-btn-toggle>
    </div>

    <v-btn @click="generate" color="accent" light>Add</v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    periods: ['1W', '1M', '3M', '6M', '1Y'],
  }),

  computed: {
    selectedWeekdays: {
      get() {
        return this.$store.state.scheduleGenerator.selectedWeekdays;
      },
      set(value) {
        this.setSelectedWeekdays(value);
      },
    },

    selectedPeriod: {
      get() {
        return this.$store.state.scheduleGenerator.selectedPeriod;
      },
      set(value) {
        this.setSelectedPeriod(value);
      },
    },
  },

  methods: {
    ...mapMutations('scheduleGenerator', [
      'setSelectedWeekdays',
      'setSelectedPeriod',
      'setShowDialog',
    ]),

    ...mapMutations('snackbar', ['showSnackbar']),

    generate() {
      if (this.selectedWeekdays.length === 0 || this.selectedPeriod === null) {
        this.showSnackbar({
          text:
            'Please select both weekdays and period for generating schedules',
        });
        return;
      } else {
        this.setShowDialog(true);
      }
    },
  },
};
</script>
