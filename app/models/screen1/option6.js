const option = {
  title: {
    text: '使用量统计',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    top: 'center',
  },
  series: [
    {
      name: '使用量',
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['40%', '58%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '26',
          fontWeight: 'bold',
          color: '#eee',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        {value: 1048, name: 'React'},
        {value: 735, name: 'Vue'},
        {value: 580, name: 'Angular'},
        {value: 484, name: 'Redux'},
        {value: 300, name: 'Rxjs'},
      ],
    },
  ],
};

export default option;
