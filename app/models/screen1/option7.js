const option = {
  title: {
    text: '食品销量统计',
  },
  grid: {
    top: '25px',
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true,
  },
  dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      {product: '拿铁', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      {product: '奶茶', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      {product: '芝士可可', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      {product: '巧克力', 2015: 72.4, 2016: 53.9, 2017: 39.1},
    ],
  },
  xAxis: {type: 'category'},
  yAxis: {},
  series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}],
};

export default option;
