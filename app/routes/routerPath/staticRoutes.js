const routes = [
  {
    path: '/user',
    title: '登录注册',
    icon: 'TeamOutlined',
    hideMenu: true,
    component: () => import('@app/user'),
    children: [
      {
        path: '/signin',
        name: '登录',
        component: () => import('@app/user/login'),
      },
      {
        path: '/signup',
        name: '注册',
        component: () => import('@app/user/signup'),
      },
      {
        path: '/verifyEmail',
        name: '验证邮箱',
        component: () => import('@app/user/verifyEmail'),
      },
      {
        path: '/setNewPwd',
        name: '重置密码',
        component: () => import('@app/user/setNewPwd'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: import('@app/404'),
    hideMenu: true,
  },
  {
    path: '/preview',
    name: '预览',
    hideMenu: true,
    componentPath: '/projects/router/design/preview',
  },
  {
    path: '/panorama',
    name: 'panorama',
    hideMenu: true,
    componentPath: '/commons/canvas/panorama',
  },
];

export default routes;
