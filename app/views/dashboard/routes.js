const routes = {
  path: '/dashboard',
  name: '仪表盘',
  icon: 'HomeOutlined',
  children: [
    {
      path: '/screen1',
      name: 'screen1',
      icon: 'DashboardOutlined',
      component: () => import('./src/screen1'),
    },
    {
      path: '/screen2',
      name: 'screen2',
      icon: 'DashboardOutlined',
      component: () => import('./src/screen2'),
    },
    {
      path: '/monitor',
      name: 'monitor',
      icon: 'DashboardOutlined',
      component: () => import('./src/monitor'),
    },
  ],
};

export default routes;
