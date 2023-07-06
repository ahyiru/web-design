const option = data => ({
  color: ['#40a9ff', '#73d13d', '#ffec3d'],
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
      },
      data: ['0s', '1s', '2s', '3s', '4s', '5s', '6s'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
      },
      name: '（m）',
      min: 0,
      max: 100,
      interval: 20,
    },
    {
      type: 'value',
      name: '（g）',
      min: -1.5,
      max: 1,
      interval: 0.5,
    },
  ],
  series: [
    {
      name: '速度',
      type: 'line',
      yAxisIndex: 0,
      data: [0, 23, 42, 61, 76, 90, 100],
    },
    {
      name: '加速度',
      type: 'line',
      yAxisIndex: 1,
      data: [0.14, 0.28, 0.11, 0.18, -0.22, -0.16, -0.12],
    },
  ],
});

export default option;
