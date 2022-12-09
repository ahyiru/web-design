const option = (name, data) => echarts => ({
  color: ['#faad14'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      name: '销量（千辆）',
      min: 2,
      max: 20,
      interval: 3,
    },
    {
      type: 'value',
      name: '售价（万元）',
      min: 20,
      max: 32,
      interval: 2,
    },
  ],
  series: [
    {
      data: [13, 17, 10, 9, 6, 7, 5, 8, 11, 10, 13, 16],
      name: '销量（千辆）',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: 6,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#1890ff' },
          { offset: 1, color: '#73d13d' },
        ]),
      },
    },
    {
      data: [28.4, 30.5, 27.8, 28.2, 26.5, 25.2, 24.8, 23.2, 25.8, 26.8, 27.4, 25.6],
      name: '售价（万元）',
      type: 'line',
      yAxisIndex: 1,
    },
  ],
});

export default option;
