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
    {
      path: '/bigscreen',
      name: 'bigscreen',
      redirect: '/bigscreen',
    },
    {
      path: '/carmodel',
      name: 'carmodel',
      redirect: '/carmodel',
    },
  ],
};

export default routes;
