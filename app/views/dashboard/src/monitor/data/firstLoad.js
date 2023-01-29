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
        lte: 160,
        color: '#06d6a0',
      },
      {
        gt: 160,
        lte: 320,
        color: '#3a86ff',
      },
      {
        gt: 320,
        lte: 480,
        color: '#ffb703',
      },
      {
        gt: 480,
        lte: 600,
        color: '#fb8500',
      },
      {
        gt: 600,
        lte: 720,
        color: '#e63946',
      },
      {
        gt: 720,
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
            yAxis: 160,
          },
          {
            yAxis: 320,
          },
          {
            yAxis: 480,
          },
          {
            yAxis: 600,
          },
          {
            yAxis: 720,
          },
        ],
      },
    },
  ],
});

export default option;
