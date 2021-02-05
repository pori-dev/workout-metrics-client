<template>
  <v-card height="100%" ref="chartContainer" class="pb-2">
    <loading-overlay :loading="loading">
      <v-card-title class="font-weight-medium grey--text" ref="chartTitle">
        <v-row justify="space-between">
          <v-col cols="12" sm="5">
            <div class="">
              Weight Records
            </div>
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
      </v-card-title>

      <weights-chart
        key="same"
        v-if="dataCollection"
        :chart-data="dataCollection"
        :options="chartOptions"
        :styles="chartStyles"
        min-height="300px"
      />
    </loading-overlay>
  </v-card>
</template>

<script>
import WeightsChart from './WeightsChart.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { subWeeks, subMonths, subYears, format, parseISO } from 'date-fns';
import { weightsChartOptions } from './weights-chart-options';

// repository
import { RepositoryFactory } from '@/repositories/repository-factory';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: {
    WeightsChart,
    LoadingOverlay,
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
    chartHeight: 0,
    chartOptions: weightsChartOptions,
  }),

  computed: {
    chartStyles() {
      return {
        height: `${this.chartHeight}px`,
        'min-height': '300px',
      };
    },

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

  mounted() {
    const chartTitleHeight = this.$refs.chartTitle.getBoundingClientRect()
      .height;
    const chartContainerHeight = this.$refs.chartContainer.$el.getBoundingClientRect()
      .height;
    this.chartHeight = chartContainerHeight - chartTitleHeight;
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
