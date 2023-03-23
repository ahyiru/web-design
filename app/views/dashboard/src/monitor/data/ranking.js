const option = data => ({
  tooltip: {
    trigger: 'item',
    formatter: ({seriesName, name, value}) => {
      if (seriesName === '停留时间') {
        return `${seriesName}：<br/>${name} : ${value} s`;
      }
      return `${seriesName}：<br/>${name} : ${value}`;
    },
  },
  grid: [{bottom: '58%'}, {top: '58%'}],
  title: [
    {
      left: 'auto',
      text: data[0].name,
      textStyle: {
        fontSize: '14px',
      },
    },
    {
      left: 'auto',
      top: '47%',
      text: data[1].name,
      textStyle: {
        fontSize: '14px',
      },
    },
  ],
  xAxis: [
    {
      // show: false,
      type: 'category',
      gridIndex: 0,
      data: data[0].data.map(({name}) => name),
      axisLabel: {
        // interval: 0,
        // rotate: 30,
        overflow: 'truncate',
      },
    },
    {
      // show: false,
      type: 'category',
      gridIndex: 1,
      data: data[1].data.map(({name}) => name),
      axisLabel: {
        // interval: 0,
        // rotate: 30,
        overflow: 'truncate',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      gridIndex: 0,
    },
    {
      type: 'value',
      gridIndex: 1,
    },
  ],
  series: [
    {
      name: data[0].name,
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: data[0].data.map(({value}) => value),
    },
    {
      name: data[1].name,
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data[1].data.map(({stay}) => stay),
    },
  ],
});

export default option;
