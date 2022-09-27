const routes = [
  {
    path: '/user',
    title: '登录注册',
    hideMenu: true,
    component: () => import('./src'),
    children: [
      {
        path: '/signin',
        name: '登录',
        component: () => import('./src/login'),
      },
      {
        path: '/signup',
        name: '注册',
        component: () => import('./src/signup'),
      },
      {
        path: '/verifyEmail',
        name: '验证邮箱',
        component: () => import('./src/verifyEmail'),
      },
      {
        path: '/setNewPwd',
        name: '重置密码',
        component: () => import('./src/setNewPwd'),
      },
    ],
  },
];

export default routes;
