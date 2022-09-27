const routes = [
  {
    path: '/design',
    name: '设计',
    icon: 'FundProjectionScreenOutlined',
    children: [
      {
        path: '/scene',
        name: '场景设计',
        icon: 'CodeSandboxOutlined',
        component: () => import('./src/scene'),
      },
      {
        path: '/scene/add',
        name: '添加场景',
        hideMenu: true,
        component: () => import('./src/scene/add'),
      },
      {
        path: '/scene/edit/:id',
        name: '编辑场景',
        component: () => import('./src/scene/add'),
      },
      {
        path: '/tags',
        name: '标签管理',
        icon: 'TagsOutlined',
        component: () => import('./src/tags'),
      },
      {
        path: '/tags/add',
        name: '添加标签',
        hideMenu: true,
        component: () => import('./src/tags/add'),
      },
      {
        path: '/tags/edit/:id',
        name: '编辑标签',
        component: () => import('./src/tags/add'),
      },
    ],
  },
];

export default routes;
