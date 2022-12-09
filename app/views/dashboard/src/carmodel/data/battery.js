const option = (name, data) => ({
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
      radius: '40%',
      center: ['18%', '50%'],
      min: 0,
      max: 660,
      axisLine: {
        lineStyle: {
          width: 4,
          color: [[1, '#40a9ff']],
        },
      },
      pointer: {
        width: 4,
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        distance: 0,
        length: 4,
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
      axisLabel: {
        distance: 6,
        color: 'auto',
        fontSize: 9,
      },
      title: {
        fontSize: 16,
        color: 'auto',
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}km',
        color: 'auto',
        fontSize: 14,
      },
      data: [
        {
          value: 593,
          name: '高速',
          title: {
            offsetCenter: ['0%', '145%'],
          },
          detail: {
            offsetCenter: ['0%', '95%'],
          },
        },
      ],
    },
    {
      type: 'gauge',
      radius: '40%',
      center: ['50%', '50%'],
      min: 0,
      max: 660,
      axisLine: {
        lineStyle: {
          width: 4,
          color: [[1, '#ffec3d']],
        },
      },
      pointer: {
        width: 4,
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        distance: 0,
        length: 4,
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
      axisLabel: {
        distance: 6,
        color: 'auto',
        fontSize: 9,
      },
      title: {
        fontSize: 16,
        color: 'auto',
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}km',
        color: 'auto',
        fontSize: 14,
      },
      data: [
        {
          value: 522,
          name: '低速',
          title: {
            offsetCenter: ['0%', '145%'],
          },
          detail: {
            offsetCenter: ['0%', '95%'],
          },
        },
      ],
    },
    {
      type: 'gauge',
      radius: '40%',
      center: ['82%', '50%'],
      min: 0,
      max: 660,
      axisLine: {
        lineStyle: {
          width: 4,
          color: [[1, '#73d13d']],
        },
      },
      pointer: {
        width: 4,
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        distance: 0,
        length: 4,
        lineStyle: {
          color: 'auto',
          width: 1,
        },
      },
      axisLabel: {
        distance: 6,
        color: 'auto',
        fontSize: 9,
      },
      title: {
        fontSize: 16,
        color: 'auto',
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}km',
        color: 'auto',
        fontSize: 14,
      },
      data: [
        {
          value: 660,
          name: '标准',
          title: {
            offsetCenter: ['0%', '145%'],
          },
          detail: {
            offsetCenter: ['0%', '95%'],
          },
        },
      ],
    },
  ],
});

export default option;
