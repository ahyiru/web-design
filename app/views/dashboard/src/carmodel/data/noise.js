const option = (name, data) => echarts => ({
  xAxis: {
    type: 'category',
    data: ['60Km/h', '80Km/h', '120Km/h'],
  },
  yAxis: {
    type: 'value',
    name: '（分贝）',
  },
  series: [
    {
      data: [58.3, 65.7, 75.1],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        color: '#f0f0f0',
        fontSize: 14,
        fontWeight: 'bold',
      },
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#1890ff' },
          { offset: 1, color: '#73d13d' },
        ]),
      },
    },
    {
      data: [53.3, 60.2, 66.8],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        color: '#f0f0f0',
        fontSize: 14,
        fontWeight: 'bold',
      },
      barWidth: 10,
      barGap: '200%',
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ffa940' },
          { offset: 1, color: '#ffec3d' },
        ]),
      },
    },
  ],
});

export default option;
