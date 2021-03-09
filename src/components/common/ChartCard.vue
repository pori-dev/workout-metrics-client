<template>
  <app-card height="100%" ref="chartContainer">
    <template #title>
      <div ref="chartTitle" class="flex-grow-1">
        <slot name="chartTitle" />
      </div>
    </template>

    <template #text>
      <loading-overlay :loading="loading">
        <slot name="chart" v-bind="chartStyle" />
      </loading-overlay>
    </template>
  </app-card>
</template>

<script>
import AppCard from '@/components/common/AppCard.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

export default {
  components: {
    LoadingOverlay,
    AppCard,
  },

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    chartHeight: 0,
  }),

  computed: {
    chartStyle() {
      return {
        height: `${this.chartHeight}px`,
        position: 'relative',
      };
    },
  },

  mounted() {
    this.$nextTick(() => {
      const chartTitleHeight = this.$refs.chartTitle.parentElement.getBoundingClientRect()
        .height;
      const chartContainerHeight = this.$refs.chartContainer.$el.getBoundingClientRect()
        .height;
      this.chartHeight =
        chartContainerHeight -
        chartTitleHeight -
        16 /* 16 is chart container padding bottom */;
    });
  },
};
</script>
