<template>
  <v-card class="pb-0">
    <loading-overlay :loading="loading">
      <v-card-title class="font-weight-medium grey--text">
        Weight Goal Details
        <v-card-text class="pb-0">
          <div
            v-for="(detail, i) in goalDetails"
            :key="i"
            class="mb-3 black--text ml-n3"
          >
            <span>
              <v-icon v-html="detail.icon" class="mr-1" />
              {{ detail.title }}:
            </span>

            <span>{{ detail.value }} </span>

            <span>{{ detail.suffix }}</span>
          </div>
        </v-card-text>
      </v-card-title>
    </loading-overlay>
  </v-card>
</template>

<script>
import {
  mdiBullseyeArrow,
  mdiScale,
  mdiCalendar,
  mdiArrowUpBold,
  mdiArrowDownBold,
} from '@mdi/js';
import { differenceInDays, parseISO } from 'date-fns';

import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: { LoadingOverlay },
  data: () => ({
    loading: false,
    goalDetails: {
      lastWeight: {
        title: 'Last weight',
        value: null,
        suffix: 'kg',
        icon: mdiScale,
      },
      goalWeight: {
        title: 'Goal weight',
        value: null,
        suffix: 'kg',
        icon: mdiBullseyeArrow,
      },
      remainingDays: {
        title: 'Remaining days',
        value: null,
        suffix: null,
        icon: mdiCalendar,
      },
      weightDifference: {
        title: null,
        value: null,
        suffix: 'kg',
        icon: null,
      },
    },
  }),

  created() {
    this.fetchWeightGoal();
  },

  methods: {
    fetchWeightGoal() {
      this.loading = true;
      weightsRepository
        .fetchWeightGoal()
        .then(({ data }) => {
          const remainingDays = differenceInDays(
            parseISO(data.goalDate),
            parseISO(data.lastWeightDate)
          );
          const weightDifference = (data.goalWeight - data.lastWeight).toFixed(
            1
          );

          const goalDetails = this.goalDetails;
          goalDetails.lastWeight.value = data.lastWeight;
          goalDetails.goalWeight.value = data.goalWeight;
          goalDetails.remainingDays.value = remainingDays;
          goalDetails.weightDifference.value = Math.abs(weightDifference);

          if (weightDifference >= 0) {
            goalDetails.weightDifference.title = 'Weight to gain';
            goalDetails.weightDifference.icon = mdiArrowUpBold;
          } else {
            goalDetails.weightDifference.title = 'Weight to lose';
            goalDetails.weightDifference.icon = mdiArrowDownBold;
          }
        })
        .catch(() => {})
        .finally(() => (this.loading = false));
    },
  },
};
</script>
