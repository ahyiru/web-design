import Page from './src';

const routes = [
  {
    path: '/page1-2',
    name: '二级菜单2',
    children: [
      {
        path: '/page1-2-1',
        name: '三级菜单1',
        icon: 'RobotOutlined',
        component: Page,
      },
      {
        path: '/page1-2-2',
        name: '三级菜单2',
        children: [
          {
            path: '/page1-2-2-1',
            name: '四级菜单1',
            component: Page,
          },
          {
            path: '/page1-2-2-2',
            name: '四级菜单1-disabled',
            component: Page,
            linkProps: {
              disabled: true,
            },
          },
          {
            path: '/page1-2-2-3',
            name: '四级菜单3-_blank',
            component: Page,
            linkProps: {
              target: '_blank',
            },
          },
          {
            path: '/page1-2-2-4',
            name: '四级菜单4-hideMenu',
            component: Page,
            hideMenu: true,
          },
        ],
      },
    ],
  },
];

export default routes;
