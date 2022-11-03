const option = {
  title: {
    text: '访问量统计',
    // subtext: '纯属虚构',
  },
  /* grid:{
    top:'50px',
    left: '4%',
    right: '4%',
    bottom:'50px',
    containLabel: true,
  }, */
  tooltip: {
    trigger: 'item',
  },
  /* legend: {
    // orient: 'vertical',
    left: 'left',
    bottom:'0',
  }, */
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      center: ['50%', '58%'],
      data: [
        {value: 1048, name: '搜索引擎'},
        {value: 735, name: '直接访问'},
        {value: 580, name: '邮件营销'},
        {value: 484, name: '联盟广告'},
        {value: 300, name: '视频广告'},
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

export default option;
