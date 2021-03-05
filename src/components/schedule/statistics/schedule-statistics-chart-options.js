export const scheduleStatisticsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: '#9e9e9e',
        },
        stacked: true,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: '#9e9e9e',
        },
        stacked: true,
      },
    ],
  },
};
