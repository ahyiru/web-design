const colors = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#f5222d', '#fadb14', '#faad14'];
const bgColor = '#2a3042';
const color = '#a6b0cf';

const axis = {
  axisLine: {
    show: true,
    lineStyle: {
      color,
    },
  },
  axisTick: {
    show: true,
    lineStyle: {
      color,
    },
  },
  axisLabel: {
    show: true,
    textStyle: {
      color,
    },
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: [color],
    },
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: [color, color],
    },
  },
};

const shadows = {
  shadowBlur: 50,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0,180,220,.5)',
};

const barItemStyle = {
  barBorderWidth: 0,
  barBorderColor: color,
  ...shadows,
};
const itemStyle = {
  borderWidth: 0,
  borderColor: color,
  ...shadows,
};
const mapItemStle = {
  itemStyle: {
    normal: {
      color,
      areaColor: color,
      borderColor: color,
      borderWidth: 0.5,
    },
    emphasis: {
      color,
      areaColor: color,
      borderColor: color,
      borderWidth: 1,
    },
  },
  label: {
    normal: {
      textStyle: {
        color: color,
      },
    },
    emphasis: {
      textStyle: {
        color: color,
      },
    },
  },
};

const itemStyles = {
  bar: {itemStyle: barItemStyle},
  pie: {itemStyle},
  scatter: {itemStyle},
  boxplot: {itemStyle},
  parallel: {itemStyle},
  sankey: {itemStyle},
  funnel: {itemStyle},
  gauge: {itemStyle},
  map: {...mapItemStle},
  geo: {...mapItemStle},
  graph: {
    itemStyle,
    lineStyle: {
      width: 1,
      color,
    },
    symbolSize: 0,
    symbol: 'circle',
    smooth: true,
    color,
    label: {
      color,
    },
  },
};

const defaultOpts = {
  // color:colors,
  backgroundColor: 'transparent',
  textStyle: {
    color,
  },
  itemStyle: {
    borderWidth: 0,
    borderColor: color,
  },
  grid: {
    top: '50px',
    left: '4%',
    right: '4%',
    bottom: '50px',
    containLabel: true,
  },
  title: {
    left: 'center',
    textStyle: {
      color,
    },
    subtextStyle: {
      color,
    },
  },
  line: {
    itemStyle: {
      borderWidth: 4,
    },
    lineStyle: {
      width: 3,
    },
    symbolSize: 0,
    symbol: 'circle',
    smooth: true,
  },
  radar: {
    itemStyle: {
      borderWidth: 4,
    },
    lineStyle: {
      width: 3,
    },
    symbolSize: 0,
    symbol: 'circle',
    smooth: true,
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: color,
      },
      emphasis: {
        borderColor: color,
      },
    },
  },
  legend: {
    icon: 'roundRect',
    left: 'center',
    top: 'bottom',
    // bottom:'20px',
    textStyle: {
      color,
    },
  },
  tooltip: {
    confine: true,
    backgroundColor: bgColor,
    borderColor: color,
    axisPointer: {
      lineStyle: {
        color,
        width: 1,
      },
      crossStyle: {
        color,
        width: 1,
      },
    },
    textStyle: {
      color,
    },
  },
  label: {
    color,
  },
  ...itemStyles,
  categoryAxis: axis,
  valueAxis: axis,
};

export default defaultOpts;
