<template>
  <v-card elevation="1">
    <loading-overlay :loading="loading">
      <div class="d-flex justify-space-around">
        <v-btn
          v-for="(btn, i) in actionButtons"
          :key="i"
          v-bind="i === activeButtonIndex ? activeAttrs : ''"
          @click="(activeButtonIndex = i), fetchAllFromDate()"
          text
          small
          plain
          >{{ btn }}</v-btn
        >
      </div>
      <weights-chart :chart-data="dataCollection" :height="350" />
    </loading-overlay>
  </v-card>
</template>

<script>
import WeightsChart from './WeightsChart.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { subWeeks, subMonths, subYears, format, parseISO } from 'date-fns';
import { RepositoryFactory } from '@/repositories/repository-factory';

const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: {
    WeightsChart,
    LoadingOverlay,
  },

  data: () => ({
    dataCollection: {},
    actionButtons: ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'],
    activeButtonIndex: 1 /* 1 Month */,
    activeAttrs: {
      color: 'primary',
      outlined: true,
    },
    loading: false,
  }),

  computed: {
    date() {
      const currentDate = new Date();

      const selectedPeriod = this.actionButtons[this.activeButtonIndex];

      const [timeRangeInt, timeRangeType] = selectedPeriod.split(' ');

      if (timeRangeType.includes('Week')) {
        return subWeeks(currentDate, timeRangeInt);
      }

      if (timeRangeType.includes('Month')) {
        return subMonths(currentDate, timeRangeInt);
      }

      if (timeRangeType.includes('Year')) {
        return subYears(currentDate, timeRangeInt);
      }

      return null;
    },
  },

  created() {
    this.fetchAllFromDate();
  },

  methods: {
    fetchAllFromDate() {
      this.loading = true;
      weightsRepository
        .fetchAllFromDate(this.date)
        .then(res => {
          this.fillData(res.data);
        })
        .catch(() => {})
        .finally(() => (this.loading = false));
    },

    fillData(weights) {
      const labels = weights.map(item => {
        return this.formatDate(item.measurementDate);
      });

      const data = weights.map(item => item.weight);

      this.dataCollection = {
        labels,
        datasets: [
          {
            label: 'Weight',
            borderColor: '#1976d2',
            backgroundColor: '#e3eefa',
            data,
            pointHitRadius: 8,
          },
        ],
      };
    },

    formatDate(date) {
      return format(parseISO(date), 'MMM d');
    },
  },
};
</script>

<style></style>
