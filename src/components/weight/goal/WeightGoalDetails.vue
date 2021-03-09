<template>
  <app-card>
    <template #title>
      Weight Goal Details
    </template>

    <template #text>
      <loading-overlay :loading="loading">
        <div
          v-for="(detail, i) in goalDetails"
          :key="i"
          class="mb-3 black--text"
        >
          <span>
            <v-icon v-html="detail.icon" class="mr-1" />
            {{ detail.title }}:
          </span>

          <span>{{ detail.value }} </span>

          <span>{{ detail.suffix }}</span>
        </div>
      </loading-overlay>
    </template>
  </app-card>
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
import AppCard from '@/components/common/AppCard.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: { LoadingOverlay, AppCard },
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
