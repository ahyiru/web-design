const option = {
  title: {
    text: '收支分析图',
  },
  grid: {
    top: '30px',
    left: '2%',
    right: '20%',
    bottom: '0',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    data: ['利润', '支出', '收入'],
    orient: 'vertical',
    left: 'right',
    top: 'center',
  },
  xAxis: [
    {
      type: 'value',
    },
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四'],
    },
  ],
  series: [
    {
      name: '利润',
      type: 'bar',
      label: {
        show: true,
        position: 'inside',
      },
      emphasis: {
        focus: 'series',
      },
      data: [200, 170, 240, 244],
    },
    {
      name: '收入',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 302, 341, 374],
    },
    {
      name: '支出',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'left',
      },
      emphasis: {
        focus: 'series',
      },
      data: [-120, -132, -101, -134],
    },
  ],
};

export default option;
