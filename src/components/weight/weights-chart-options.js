export const weightsChartOptions = {
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
};
