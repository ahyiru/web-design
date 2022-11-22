const option = (typeList, data) => ({
  grid: {
    top: '30px',
    left: '2%',
    right: '2%',
    bottom: '50px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: typeList,
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
      color: '#fff',
    },
    emphasis: {
      focus: 'series',
    },
    data: value.map(({count}) => count),
  })),
});

export default option;
