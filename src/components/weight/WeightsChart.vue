<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,

  mixins: [reactiveProp],

  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          // changes label from `Weight: 82` to `Weight: 82 kg`
          label(tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) label += ': ';
            return (label += tooltipItem.value + ' kg');
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#9e9e9e',
            },
            // Todo: check if it is better to add min and max ticks
            // to improve chart yAxes ui
            //  ticks: {
            //    min: 20,
            //    max: 100,
            //  },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: '#9e9e9e',
              autoSkipPadding: 60,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style></style>
