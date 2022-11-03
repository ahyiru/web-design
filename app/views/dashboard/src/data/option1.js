const option = echarts => ({
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: '使用量统计',
    subtext: '前端框架周使用量统计',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['React', 'Vue', 'Angular', 'Redux', 'Rxjs'],
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
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
      name: 'React',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(128, 255, 165)',
          },
          {
            offset: 1,
            color: 'rgba(1, 191, 236)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: 'Vue',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(0, 221, 255)',
          },
          {
            offset: 1,
            color: 'rgba(77, 119, 255)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 282, 111, 234, 220, 340, 310],
    },
    {
      name: 'Angular',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(55, 162, 255)',
          },
          {
            offset: 1,
            color: 'rgba(116, 21, 219)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 132, 201, 334, 190, 130, 220],
    },
    {
      name: 'Redux',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255, 0, 135)',
          },
          {
            offset: 1,
            color: 'rgba(135, 0, 157)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 402, 231, 134, 190, 230, 120],
    },
    {
      name: 'Rxjs',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255, 191, 0)',
          },
          {
            offset: 1,
            color: 'rgba(224, 62, 76)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 302, 181, 234, 210, 290, 150],
    },
  ],
});

export default option;
