const option = {
  title: {
    text: '网站访问量统计',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: [
    {
      bottom: '20px',
      data: ['直接访问', '邮件营销', '视频广告', '谷歌'],
    },
    {
      bottom: '-5px',
      data: ['搜索引擎', '联盟广告', '百度', '必应', '其他'],
    },
  ],
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '搜索引擎',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: 'series',
      },
      markLine: {
        lineStyle: {
          type: 'dashed',
        },
        data: [[{type: 'min'}, {type: 'max'}]],
      },
    },
    {
      name: '百度',
      type: 'bar',
      barWidth: 5,
      stack: '搜索引擎',
      emphasis: {
        focus: 'series',
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120],
    },
    {
      name: '谷歌',
      type: 'bar',
      stack: '搜索引擎',
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 290, 230, 220],
    },
    {
      name: '必应',
      type: 'bar',
      stack: '搜索引擎',
      emphasis: {
        focus: 'series',
      },
      data: [60, 72, 71, 74, 190, 130, 110],
    },
    {
      name: '其他',
      type: 'bar',
      stack: '搜索引擎',
      emphasis: {
        focus: 'series',
      },
      data: [62, 82, 91, 84, 109, 110, 120],
    },
  ],
};

export default option;
