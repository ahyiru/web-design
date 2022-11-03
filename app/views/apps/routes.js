const routes = {
  path: '/apps',
  name: ' App',
  icon: 'AppstoreAddOutlined',
  children: [
    {
      path: '/projects',
      name: '项目管理',
      icon: 'ConsoleSqlOutlined',
      component: () => import('./src/projects'),
    },
    {
      path: '/projects/add',
      name: '添加项目',
      hideMenu: true,
      component: () => import('./src/projects/add'),
    },
    {
      path: '/projects/edit/:projectId',
      name: '编辑项目',
      component: () => import('./src/projects/add'),
    },
    {
      path: '/projects/router/:projectId',
      name: '项目路由设置',
      component: () => import('./src/projects/router'),
    },
    {
      path: '/projects/router/:projectId/:routerId',
      name: '页面设计',
      component: () => import('./src/projects/router/design'),
    },
    {
      path: '/projects/api/:projectId',
      name: '项目接口管理',
      component: () => import('./src/projects/apis'),
    },
    {
      path: '/projects/api/:projectId/add',
      name: '添加接口',
      component: () => import('./src/projects/apis/add'),
    },
    {
      path: '/projects/api/:projectId/edit/:id',
      name: '编辑接口',
      component: () => import('./src/projects/apis/add'),
    },
    {
      path: '/projects/api/:projectId/test/:id',
      name: '接口测试',
      component: () => import('./src/projects/apis/test'),
    },
    {
      path: '/users',
      name: '用户管理',
      icon: 'UsergroupAddOutlined',
      component: () => import('./src/users'),
    },
    {
      path: '/users/add',
      name: '添加用户',
      hideMenu: true,
      component: () => import('./src/users/add'),
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      component: () => import('./src/users/add'),
    },
    {
      path: '/users/auth/:id',
      name: '路由权限设置',
      component: () => import('./src/users/auth'),
    },
    {
      path: '/apis',
      name: '接口管理',
      icon: 'ClusterOutlined',
      component: () => import('./src/projects/apis'),
    },
    {
      path: '/apis/add',
      name: '添加接口',
      hideMenu: true,
      component: () => import('./src/projects/apis/add'),
    },
    {
      path: '/apis/edit/:id',
      name: '编辑接口',
      component: () => import('./src/projects/apis/add'),
    },
    {
      path: '/apis/test/:id',
      name: '接口测试',
      component: () => import('./src/projects/apis/test'),
    },
  ],
};

export default routes;
