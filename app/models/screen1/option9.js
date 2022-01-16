const option = {
  title: {
    text: '销量统计图',
    // subtext: '纯属虚构',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },
  legend: {
    data: ['展现', '点击', '访问', '咨询', '订单'],
  },
  series: [
    {
      name: '预期',
      type: 'funnel',
      left: '6%',
      width: '80%',
      label: {
        formatter: '{b}预期',
      },
      labelLine: {
        show: false,
      },
      itemStyle: {
        opacity: 0.7,
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}预期: {c}%',
        },
      },
      data: [
        {value: 60, name: '访问'},
        {value: 40, name: '咨询'},
        {value: 20, name: '订单'},
        {value: 80, name: '点击'},
        {value: 100, name: '展现'},
      ],
    },
    {
      name: '实际',
      type: 'funnel',
      left: '6%',
      width: '80%',
      maxSize: '80%',
      label: {
        position: 'inside',
        formatter: '{c}%',
        color: '#fff',
      },
      itemStyle: {
        // opacity: 0.5,
        borderColor: 'rgba(0,0,0,.2)', //'#a6b0cf',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}实际: {c}%',
        },
      },
      data: [
        {value: 30, name: '访问'},
        {value: 10, name: '咨询'},
        {value: 5, name: '订单'},
        {value: 50, name: '点击'},
        {value: 80, name: '展现'},
      ],
      // Ensure outer shape will not be over inner shape when hover.
      z: 100,
    },
  ],
};

export default option;
