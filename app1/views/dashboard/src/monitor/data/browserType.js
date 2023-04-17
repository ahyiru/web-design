const option = (name, data) => ({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name,
      type: 'pie',
      radius: ['25%', '75%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data,
    },
  ],
});

export default option;
