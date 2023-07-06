const routes = {
  path: '/demand',
  name: '需求管理',
  icon: 'CloudServerOutlined',
  children: [
    {
      path: '/demand',
      name: '需求列表',
      icon: 'ico-flag',
      component: () => import('./src'),
    },
    {
      path: '/demand/add',
      name: '添加需求',
      hideMenu: true,
      component: () => import('./src/add'),
    },
    {
      path: '/demand/edit/:id',
      name: '编辑需求',
      component: () => import('./src/add'),
    },
  ],
};

export default routes;
