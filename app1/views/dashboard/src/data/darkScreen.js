const colors = ['#40a9ff', '#73d13d', '#ffec3d', '#ff4d4f', '#ffa940', '#9254de', '#1890ff', '#52c41a', '#fadb14', '#f5222d', '#fa8c16', '#722ed1'];
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
    color,
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

const itemStyle = {
  borderWidth: 0,
  borderColor: color,
  ...shadows,
};
const mapItemStle = {
  itemStyle: {
    color,
    areaColor: color,
    borderColor: color,
    borderWidth: 0.5,
  },
  label: {
    color,
  },
  emphasis: {
    itemStyle: {
      color,
      areaColor: color,
      borderColor: color,
      borderWidth: 1,
    },
    label: {
      color,
    },
  },
};

const itemStyles = {
  bar: {itemStyle},
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
    color,
    label: {
      color,
    },
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
};

const defaultOpts = {
  // color: colors,
  backgroundColor: 'transparent',
  textStyle: {
    color,
  },
  itemStyle: {
    borderWidth: 0,
    borderColor: color,
  },
  label: {
    color,
  },
  grid: {
    top: '35px',
    left: '4%',
    right: '4%',
    bottom: '35px',
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
  toolbox: {
    iconStyle: {
      borderColor: color,
    },
    emphasis: {
      iconStyle: {
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
  ...itemStyles,
  categoryAxis: axis,
  valueAxis: axis,
};

export default defaultOpts;
