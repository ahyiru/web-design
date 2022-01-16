const option = {
  title: {
    text: '实时内存监控',
  },
  series: [
    {
      type: 'gauge',
      radius: '90%',
      center: ['50%', '60%'],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d'],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        distance: -20,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2,
        },
      },
      splitLine: {
        distance: -20,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4,
        },
      },
      axisLabel: {
        color: 'auto',
        distance: 25,
        fontSize: 16,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: 'auto',
        fontSize: 22,
      },
      data: [
        {
          value: 64,
        },
      ],
    },
  ],
};

/* setInterval(function () {
  option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
  myChart.setOption(option, true);
}, 2000); */

export default option;
