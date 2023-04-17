const colors = [
  {
    water: '#252c33',
    land: '#2b323a',
    highway: '#3c4752',
    local: '#303841',
  },
  {
    water: '#efefef',
    land: '#fcfcfc',
    highway: '#e0e0e0',
    local: '#dedede',
  },
];

const styleJson = colors => [
  {
    featureType: 'water',
    elementType: 'all',
    stylers: {
      color: colors['water'],
    },
  },
  {
    featureType: 'land',
    elementType: 'all',
    stylers: {
      color: colors['land'],
    },
  },
  {
    featureType: 'railway',
    elementType: 'all',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highway',
    elementType: 'all',
    stylers: {
      color: colors['highway'],
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      color: colors['highway'],
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.fill',
    stylers: {
      color: colors['highway'],
    },
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'green',
    elementType: 'all',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subway',
    elementType: 'all',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'all',
    stylers: {
      color: colors['local'],
    },
  },
  {
    featureType: 'local',
    elementType: 'all',
    stylers: {
      color: colors['local'],
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'boundary',
    elementType: 'all',
    stylers: {
      color: colors['highway'],
    },
  },
  {
    featureType: 'building',
    elementType: 'all',
    stylers: {
      color: colors['local'],
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text',
    stylers: {
      fontsize: 24,
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.fill',
    stylers: {
      weight: 0,
      color: '#f0f0f0f0',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.stroke',
    stylers: {
      weight: 0,
      color: '#f0f0f0f0',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
];
const option = (data, {key}) => ({
  tooltip: {
    trigger: 'item',
  },
  bmap: {
    // center: [104.114129, 37.550339],
    center: [108.5525, 34.3227],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: styleJson(colors[key === 'dark' ? 0 : 1]),
    },
  },
  series: [
    {
      name: '访问次数',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data,
      symbolSize: val => 10 + val[2] / 5,
      encode: {
        value: 2,
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: false,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      itemStyle: {
        color: '#1890ff',
        shadowBlur: 10,
        shadowColor: '#40a9ff',
      },
    },
    {
      name: '访问量Top5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: data.sort((a, b) => b.value[2] - a.value[2]).slice(0, 5),
      symbolSize: val => 10 + val[2] / 5,
      encode: {
        value: 2,
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke',
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: true,
      },
      itemStyle: {
        color: '#52c41a',
        shadowBlur: 10,
        shadowColor: '#73d13d',
      },
      emphasis: {
        scale: true,
      },
      zlevel: 1,
    },
  ],
});

export default option;
