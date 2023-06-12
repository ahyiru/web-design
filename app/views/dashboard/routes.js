const routes = [
  {
    path: '/monitor',
    name: '页面监控',
    icon: 'LineChartOutlined',
    component: () => import('./src/monitor'),
  },
  {
    path: '/dashboard',
    name: '大屏',
    icon: 'DashboardOutlined',
    children: [
      {
        path: '/screen1',
        name: 'screen1',
        icon: 'BarChartOutlined',
        component: () => import('./src/screen1'),
      },
      {
        path: '/screen2',
        name: 'screen2',
        icon: 'PieChartOutlined',
        component: () => import('./src/screen2'),
      },
      {
        path: '/bigscreen',
        name: 'bigscreen',
        icon: 'LineChartOutlined',
        redirect: '/bigscreen',
      },
      {
        path: '/carmodel',
        name: 'carmodel',
        icon: 'LineChartOutlined',
        redirect: '/carmodel',
      },
      /* {
        path: '/smartcity',
        name: 'smartcity',
        redirect: '/smartcity',
      }, */
    ],
  },
];

export default routes;
