const styleJson = [
  {
    featureType: 'water',
    elementType: 'all',
    stylers: {
      color: '#252c33', // '#282f36',
    },
  },
  {
    featureType: 'land',
    elementType: 'all',
    stylers: {
      color: '#2b323a',
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
      color: '#3c4752',
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
      color: '#3c4752',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.fill',
    stylers: {
      color: '#3c4752',
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
      color: '#303841',
    },
  },
  {
    featureType: 'local',
    elementType: 'all',
    stylers: {
      color: '#303841',
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
      color: '#3c4752',
    },
  },
  {
    featureType: 'building',
    elementType: 'all',
    stylers: {
      color: '#303841',
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
const option = data => ({
  tooltip: {
    trigger: 'item',
  },
  bmap: {
    // center: [104.114129, 37.550339],
    center: [108.552500, 34.322700],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson,
    },
  },
  series: [
    {
      name: '访问次数',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data,
      // symbolSize: val => val[2] / 10,
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
      name: '排名前五',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: data.sort((a, b) => b.value[2] - a.value[2]).slice(0, 5),
      // symbolSize: val => val[2] / 10,
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