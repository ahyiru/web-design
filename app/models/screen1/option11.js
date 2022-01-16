const option = {
  title: {
    text: '使用量统计',
  },
  angleAxis: {},
  radiusAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四'],
    z: 8,
  },
  polar: {
    radius: ['10%', '70%'],
    center: ['50%', '50%'],
  },
  series: [
    {
      type: 'bar',
      data: [1, 2, 3, 4],
      coordinateSystem: 'polar',
      name: 'React',
      stack: 'a',
      emphasis: {
        focus: 'series',
      },
    },
    {
      type: 'bar',
      data: [2, 4, 6, 8],
      coordinateSystem: 'polar',
      name: 'Vue',
      stack: 'a',
      emphasis: {
        focus: 'series',
      },
    },
    {
      type: 'bar',
      data: [1, 2, 3, 4],
      coordinateSystem: 'polar',
      name: 'Angular',
      stack: 'a',
      emphasis: {
        focus: 'series',
      },
    },
  ],
  legend: {
    show: true,
    data: ['React', 'Vue', 'Angular'],
  },
};

export default option;
