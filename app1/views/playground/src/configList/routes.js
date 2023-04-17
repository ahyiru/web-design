const routes = [
  {
    path: '/configList',
    name: 'configList',
    component: () => import('./src'),
  },
  {
    path: '/configList/add',
    name: '添加用户',
    hideMenu: true,
    component: () => import('./src/add'),
  },
  {
    path: '/configList/edit/:id',
    name: '编辑用户',
    component: () => import('./src/add'),
  },
  {
    path: '/configList/auth/:id',
    name: '路由权限设置',
    component: () => import('./src/auth'),
  },
];

export default routes;
