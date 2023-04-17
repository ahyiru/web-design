const option = (name, data) => ({
  tooltip: {
    trigger: 'axis',
    formatter: '{a} <br/>{b} : {c} ms',
  },
  grid: {
    top: '8px',
    left: '10px',
    right: '140px',
    bottom: '2px',
  },
  xAxis: {
    type: 'category',
    data: data.map(({startTime}) => startTime),
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} ms',
    },
  },
  visualMap: {
    top: '0px',
    right: '0px',
    textStyle: {
      color: '#3a86ff',
    },
    pieces: [
      {
        gt: 0,
        lte: 120,
        color: '#06d6a0',
      },
      {
        gt: 120,
        lte: 300,
        color: '#3a86ff',
      },
      {
        gt: 300,
        lte: 480,
        color: '#ffb703',
      },
      {
        gt: 480,
        lte: 640,
        color: '#fb8500',
      },
      {
        gt: 640,
        lte: 800,
        color: '#e63946',
      },
      {
        gt: 800,
        color: '#9d0208',
      },
    ],
    outOfRange: {
      color: 'rgba(180, 180, 180, 0.1)',
    },
  },
  series: [
    {
      name,
      data: data.map(({firstLoadTime}) => firstLoadTime),
      type: 'line',
      smooth: true,
      markLine: {
        silent: true,
        lineStyle: {
          // color: '#333',
        },
        data: [
          {
            yAxis: 120,
          },
          {
            yAxis: 300,
          },
          {
            yAxis: 480,
          },
          {
            yAxis: 640,
          },
          {
            yAxis: 800,
          },
        ],
      },
    },
  ],
});

export default option;
