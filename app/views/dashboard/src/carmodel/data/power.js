const option = (name, data) => ({
  color: ['#40a9ff', '#73d13d', '#ffec3d'],
  // tooltip: {},
  grid: {
    top: '4px',
    left: '4px',
    right: '4px',
    bottom: '4px',
    containLabel: true,
  },
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '82%',
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          shadowColor: 'rgba(180, 180, 180, 0.06)',
          shadowBlur: 6,
        },
      },
      axisLine: {
        lineStyle: {
          width: 32,
          color: [[1, 'rgba(180, 180, 180, 0.06)']],
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [
        {
          value: 64,
          name: '平顺性',
          title: {
            offsetCenter: ['0%', '-44%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-28%'],
          },
        },
        {
          value: 90,
          name: '动力响应',
          title: {
            offsetCenter: ['0%', '-8%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '8%'],
          },
        },
        {
          value: 85,
          name: '传动系统',
          title: {
            offsetCenter: ['0%', '28%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '44%'],
          },
        },
      ],
      title: {
        fontSize: 10,
        color: '#fff',
      },
      detail: {
        width: 20,
        height: 4,
        fontSize: 10,
        color: 'inherit',
        borderColor: 'inherit',
        borderRadius: 10,
        borderWidth: 1,
        formatter: '{value}%',
      },
    },
  ],
});

export default option;
