const option = (name, data) => echarts => ({
  color: ['#ffc53d'],
  radar: {
    shape: 'circle',
    splitArea: {
      areaStyle: {
        color: 'transparent',
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
    },
    indicator: [
      {name: '外观', max: 12},
      {name: '空间', max: 12},
      {name: '动力', max: 12},
      {name: '加速', max: 12},
      {name: '续航', max: 12},
      {name: '刹车', max: 10},
      {name: '舒适', max: 10},
      {name: '噪音', max: 10},
      {name: '价格', max: 10},
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [8.9, 7.2, 10.6, 9.2, 8.7, 7.8, 8.6, 7.2, 6.3],
          name: '总和测评',
          symbolSize: 4,
          lineStyle: {
            type: 'dashed',
            width: 1,
          },
          label: {
            show: true,
            formatter: params => params.value,
            color: '#f8f8f8',
            fontWeight: 'bold',
          },
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.2, 0.6, 1, [
              {
                color: 'rgba(250, 219, 20, 0.2)',
                offset: 0,
              },
              {
                color: 'rgba(250, 219, 20, 0.8)',
                offset: 1,
              },
            ]),
          },
        },
      ],
    },
  ],
});

export default option;
