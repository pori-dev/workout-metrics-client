<template>
  <chart-card>
    <template #chartTitle>
      <v-row justify="space-between">
        <v-col cols="12" sm="5">
          Weight Records
        </v-col>

        <v-col cols="12" sm="7">
          <div class="d-flex flex-wrap justify-end">
            <v-btn
              v-for="(btn, i) in actionButtons"
              :key="i"
              v-bind="i === activeButtonIndex ? activeAttrs : ''"
              @click="(activeButtonIndex = i), fetchAllFromDate()"
              class="grey--text"
              text
              small
              plain
              >{{ btn }}</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </template>

    <template #chart="chartStyle">
      <loading-overlay :loading="loading">
        <weights-chart
          :chart-data="dataCollection"
          :options="chartOptions"
          :styles="chartStyle"
        />
      </loading-overlay>
    </template>
  </chart-card>
</template>

<script>
import WeightsChart from './WeightsChart.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';
import ChartCard from '@/components/common/ChartCard.vue';
import { subWeeks, subMonths, subYears, format, parseISO } from 'date-fns';
import { weightsChartOptions } from './weights-chart-options';

// repository
import { RepositoryFactory } from '@/repositories/repository-factory';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: {
    WeightsChart,
    LoadingOverlay,
    ChartCard,
  },

  data: () => ({
    dataCollection: {},
    actionButtons: ['1W', '1M', '3M', '6M', '1Y'],
    activeButtonIndex: 1 /* 1 Month */,
    activeAttrs: {
      color: 'primary',
      outlined: true,
    },
    loading: false,
    chartOptions: weightsChartOptions,
  }),

  computed: {
    date() {
      const currentDate = new Date();

      const selectedPeriod = this.actionButtons[this.activeButtonIndex];

      const [timeRangeInt, timeRangeType] = selectedPeriod.split('');

      if (timeRangeType.includes('W')) {
        return subWeeks(currentDate, timeRangeInt);
      }

      if (timeRangeType.includes('M')) {
        return subMonths(currentDate, timeRangeInt);
      }

      if (timeRangeType.includes('Y')) {
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
        return this.formatDate(item.date);
      });

      const data = weights.map(item => item.weight);

      this.dataCollection = {
        labels,
        datasets: [
          {
            label: 'Weight',
            borderColor: '#1976d2',
            backgroundColor: 'rgb(25, 118, 210, .08)',
            lineTension: 0,
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
