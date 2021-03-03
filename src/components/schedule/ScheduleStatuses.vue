<template>
  <div>
    <div
      v-for="status in statuses"
      :key="status.text"
      class="status-badge pl-3"
    >
      <v-badge class="status-indicator" :color="status.color" dot left>
        <span>{{ status.text }}</span>
        <span v-if="hasCounts">: {{ status.counts }} </span>
      </v-badge>
    </div>
  </div>
</template>

<script>
import { STATUS_COLOR } from '@/common/enums/status-colors.enum';
import isEmpty from 'lodash/isEmpty';

export default {
  props: {
    counts: {
      default: () => ({}),
      type: Object,
    },
  },

  computed: {
    hasCounts() {
      return !isEmpty(this.counts);
    },

    statuses() {
      return [
        {
          text: 'Done',
          color: STATUS_COLOR['done'],
          counts: this.counts.done,
        },
        {
          text: 'Missed',
          color: STATUS_COLOR['missed'],
          counts: this.counts.missed,
        },
        {
          text: 'Indeterminate',
          color: STATUS_COLOR['indeterminate'],
          counts: this.counts.indeterminate,
        },
        {
          text: 'Todo',
          color: STATUS_COLOR['todo'],
          counts: this.counts.todo,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.status-indicator ::v-deep .v-badge__badge {
  inset: 2px 0 0 -12px !important;
}
</style>
