const color = '#a6b0cf';
const option = {
  title: {
    text: '网站访问量统计',
  },
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
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color,
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color: '#fff',
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color: '#fff',
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color: '#eee',
      },
      emphasis: {
        focus: 'series',
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color: '#eee',
      },
      emphasis: {
        focus: 'series',
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320],
    },
  ],
};

export default option;
