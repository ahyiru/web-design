const routes = [
  {
    path: '/user',
    title: '登录注册',
    icon: 'TeamOutlined',
    hideMenu: true,
    component: () => import('@app/views/user'),
    children: [
      {
        path: '/signin',
        name: '登录',
        component: () => import('@app/views/user/login'),
      },
      {
        path: '/signup',
        name: '注册',
        component: () => import('@app/views/user/signup'),
      },
      {
        path: '/verifyEmail',
        name: '验证邮箱',
        component: () => import('@app/views/user/verifyEmail'),
      },
      {
        path: '/setNewPwd',
        name: '重置密码',
        component: () => import('@app/views/user/setNewPwd'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: import('@app/views/404'),
    hideMenu: true,
  },
  {
    path: '/preview',
    name: '预览',
    hideMenu: true,
    component: () => import('@app/views/apps/projects/router/design/preview'),
  },
  {
    path: '/panorama',
    name: 'panorama',
    hideMenu: true,
    component: () => import('@app/views/commons/canvas/panorama'),
  },
  {
    path: '/x6-demo/:id',
    name: 'x6',
    hideMenu: true,
    component: () => import('@app/views/commons/x6-demo/pages'),
    linkProps: {
      target: '_blank',
    },
  },
  /* {
    path: '/h5',
    name: 'h5',
    hideMenu: true,
    component: () => import('@app/h5/configList'),
  }, */
];

export default routes;
