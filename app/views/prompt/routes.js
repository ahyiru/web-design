const routes = {
  path: '/prompt',
  name: 'prompt',
  icon: 'BulbOutlined',
  children: [
    {
      path: '/prompt',
      name: '提示',
      icon: 'ico-flag',
      component: () => import('./src'),
    },
    {
      path: '/prompt/add',
      name: '添加prompt',
      hideMenu: true,
      component: () => import('./src/add'),
    },
    {
      path: '/prompt/edit/:id',
      name: '编辑prompt',
      component: () => import('./src/add'),
    },
  ],
};

export default routes;
