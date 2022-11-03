const option = {
  title: {
    text: '使用量统计',
  },
  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: ['25%', '75%'],
      center: ['50%', '55%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
        /* shadowBlur: 200,
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        shadowColor: 'rgba(0,180,220,.5)', */
      },
      data: [
        {value: 40, name: 'React'},
        {value: 38, name: 'Vue'},
        {value: 32, name: 'Angular'},
        {value: 30, name: 'Redux'},
        {value: 28, name: 'Rxjs'},
        {value: 26, name: 'Nodejs'},
        {value: 22, name: 'Express'},
        {value: 18, name: 'Mongodb'},
      ],
    },
  ],
};

export default option;
