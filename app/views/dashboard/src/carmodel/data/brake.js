const option = () => echarts => ({
  color: ['#1890ff'],
  xAxis: {
    type: 'category',
    data: ['第1次', '第3次', '第5次', '第7次', '第9次'],
  },
  yAxis: {
    type: 'value',
    name: '（m）',
  },
  series: [
    {
      data: [39.19, 39.98, 41.03, 39.52, 40.97],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        color: '#f0f0f0',
        fontSize: 14,
        fontWeight: 'bold',
      },
      barWidth: 15,
      itemStyle: {
        borderRadius: 6,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#14c8d4' },
          { offset: 1, color: '#43eec6' },
        ]),
      },
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
        borderRadius: 6,
      },
    },
  ],
});

export default option;