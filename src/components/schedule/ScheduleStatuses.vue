<template>
  <div>
    <div v-for="status in statuses" :key="status.text" class="pl-3">
      <v-badge class="status-indicator" :color="status.color" dot left>
        <span>{{ status.text }}</span>
      </v-badge>
    </div>
  </div>
</template>

<script>
import { STATUS_COLOR } from '@/common/enums/status-colors.enum';

export default {
  computed: {
    statuses() {
      return [
        {
          text: 'Done',
          color: STATUS_COLOR['done'],
        },
        {
          text: 'Missed',
          color: STATUS_COLOR['missed'],
        },
        {
          text: 'Indeterminate',
          color: STATUS_COLOR['indeterminate'],
        },
        {
          text: 'Todo',
          color: STATUS_COLOR['todo'],
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
