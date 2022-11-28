const option = (data) => ({
  grid: {
    top: '20px',
    left: '2%',
    right: '2%',
    bottom: '35px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: data.map(({name}) => name),
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: data[0] ? data[0].value.map(({weekLabel}) => weekLabel) : [],
  },
  series: data.map(({name, value}) => ({
    name,
    type: 'bar',
    stack: 'total',
    label: {
      show: true,
      formatter: ({value}) => value ? value : '',
      color: '#fff',
    },
    emphasis: {
      focus: 'series',
    },
    data: value.map(({count}) => count),
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.01)',
    },
  })),
});

export default option;
