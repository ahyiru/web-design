import {browserRouter} from '@app/configs';
import pageSchema from '@app/utils/getPageSchema';

import LowCode from '@app/views/lowCode';
import Page from '@app/views/page';

export const configRoutes = {
  path: '/layout',
  name: '框架配置',
  icon: 'LayoutOutlined',
  component: () => import('@app/views/layout'),
};
export const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: () => import('@app/views/apps/users/profile'),
};
export const appRoutes = {
  path: '/apps',
  name: ' App',
  icon: 'AppstoreAddOutlined',
  children: [
    {
      path: '/projects',
      name: '项目管理',
      icon: 'ConsoleSqlOutlined',
      component: () => import('@app/views/apps/projects'),
    },
    {
      path: '/projects/add',
      name: '添加项目',
      hideMenu: true,
      component: () => import('@app/views/apps/projects/add'),
    },
    {
      path: '/projects/edit/:projectId',
      name: '编辑项目',
      component: () => import('@app/views/apps/projects/add'),
    },
    {
      path: '/projects/router/:projectId',
      name: '项目路由设置',
      component: () => import('@app/views/apps/projects/router'),
    },
    {
      path: '/projects/router/:projectId/:routerId',
      name: '页面设计',
      component: () => import('@app/views/apps/projects/router/design'),
    },
    {
      path: '/projects/api/:projectId',
      name: '项目接口管理',
      component: () => import('@app/views/apps/projects/apis'),
    },
    {
      path: '/projects/api/:projectId/add',
      name: '添加接口',
      component: () => import('@app/views/apps/projects/apis/add'),
    },
    {
      path: '/projects/api/:projectId/edit/:id',
      name: '编辑接口',
      component: () => import('@app/views/apps/projects/apis/add'),
    },
    {
      path: '/projects/api/:projectId/test/:id',
      name: '接口测试',
      component: () => import('@app/views/apps/projects/apis/test'),
    },
    {
      path: '/users',
      name: '用户管理',
      icon: 'UsergroupAddOutlined',
      component: () => import('@app/views/apps/users'),
    },
    {
      path: '/users/add',
      name: '添加用户',
      hideMenu: true,
      component: () => import('@app/views/apps/users/add'),
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      component: () => import('@app/views/apps/users/add'),
    },
    {
      path: '/users/auth/:id',
      name: '路由权限设置',
      component: () => import('@app/views/apps/users/auth'),
    },
    {
      path: '/apis',
      name: '接口管理',
      icon: 'ClusterOutlined',
      component: () => import('@app/views/apps/projects/apis'),
    },
    {
      path: '/apis/add',
      name: '添加接口',
      hideMenu: true,
      component: () => import('@app/views/apps/projects/apis/add'),
    },
    {
      path: '/apis/edit/:id',
      name: '编辑接口',
      component: () => import('@app/views/apps/projects/apis/add'),
    },
    {
      path: '/apis/test/:id',
      name: '接口测试',
      component: () => import('@app/views/apps/projects/apis/test'),
    },
  ],
};
export const commonRoutes = {
  path: '/commons',
  name: ' Common',
  icon: 'ShopOutlined',
  children: [
    {
      path: '/suspense',
      name: 'suspense',
      icon: 'CoffeeOutlined',
      children: [
        {
          path: '/suspense',
          name: 'suspense',
          component: () => import('@app/views/commons/suspense'),
        },
        {
          path: '/errorboundary',
          name: 'errorboundary',
          component: () => import('@app/views/commons/suspense/errorboundary'),
        },
      ],
    },
    {
      path: '/canvas',
      name: '图形绘制',
      icon: 'AreaChartOutlined',
      children: [
        {
          path: '/canvas',
          name: 'canvas',
          component: () => import('@app/views/commons/canvas'),
        },
        {
          path: '/d3',
          name: 'd3',
          component: () => import('@app/views/commons/canvas/d3'),
        },
        {
          path: '/webgl',
          name: 'webgl',
          component: () => import('@app/views/commons/canvas/webgl'),
        },
        {
          path: '/panorama',
          name: 'panorama',
          redirect: '/panorama',
          linkProps: {
            target: '_blank',
          },
        },
        {
          path: 'http://ihuxy.com:8080/',
          name: 'showroom',
          linkProps: {
            target: '_blank',
          },
        },
        {
          path: '/dragable',
          name: 'dragable',
          component: () => import('@app/views/commons/canvas/dragable'),
        },
      ],
    },
    {
      path: '/graph',
      name: 'graphin',
      icon: 'FundOutlined',
      component: () => import('@app/views/commons/graph'),
    },
    {
      path: '/x6-demo',
      name: 'x6',
      icon: 'FundOutlined',
      component: () => import('@app/views/commons/x6-demo/pages'),
    },
    {
      path: '/slate',
      name: '富文本编辑器-slate',
      icon: 'EditOutlined',
      component: () => import('@app/views/commons/slate'),
    },
    {
      path: '/virtualList',
      name: '虚拟列表',
      icon: 'UnorderedListOutlined',
      component: () => import('@app/views/commons/virtualList'),
    },
  ],
};
export const dashboardRoutes = {
  path: '/dashboard',
  name: '仪表盘',
  icon: 'HomeOutlined',
  children: [
    {
      path: '/screen1',
      name: 'screen1',
      icon: 'DashboardOutlined',
      component: () => import('@app/views/dashboard/screen1'),
    },
    {
      path: '/screen2',
      name: 'screen2',
      icon: 'DashboardOutlined',
      component: () => import('@app/views/dashboard/screen2'),
    },
  ],
};
export const lowCodeRoutes = {
  path: '/low-code',
  name: '低代码',
  icon: 'CoffeeOutlined',
  children: [
    {
      path: '/dom',
      name: '原生dom',
      icon: 'CodeOutlined',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/ui',
      name: 'UI组件',
      icon: 'CodeOutlined',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users',
      name: '业务组件',
      icon: 'CodeOutlined',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users/add',
      name: '新增用户',
      component: LowCode,
      hideMenu: true,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
  ],
};
export const pageRoutes = {
  path: '/page1',
  name: '一级菜单',
  icon: 'FileTextOutlined',
  children: [
    {
      path: '/page1-1',
      name: '二级菜单1',
      component: Page,
    },
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
    {
      path: '/page1-3',
      name: '二级菜单3',
      icon: 'RobotOutlined',
      component: Page,
    },
  ],
};
export const playgroundRoutes = {
  path: '/playground',
  name: 'Playground',
  icon: 'ConsoleSqlOutlined',
  children: [
    {
      path: '/demo',
      name: 'demo',
      icon: 'MergeCellsOutlined',
      denied: browserRouter,
      component: () => import('@app/views/demo'),
    },
    {
      path: '/icons',
      name: 'icons',
      icon: 'PictureOutlined',
      component: () => import('@app/views/demo/icons'),
    },
    {
      path: '/md2html',
      name: 'md2html',
      component: () => import('@app/views/demo/md2html'),
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('@app/views/demo/panel'),
    },
    {
      path: '/styles',
      name: 'styles',
      component: () => import('@app/views/demo/styles'),
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('@app/views/demo/modal'),
    },
    {
      path: '/demo-tools',
      name: 'tools',
      component: () => import('@app/views/demo/tools'),
    },
    {
      path: '/bagua',
      name: 'bagua',
      component: () => import('@app/views/demo/bagua'),
    },
    {
      path: '/configTable',
      name: 'configTable',
      component: () => import('@app/views/demo/configList'),
    },
    {
      path: '/configTable/add',
      name: '添加用户',
      hideMenu: true,
      component: () => import('@app/views/demo/configList/add'),
    },
    {
      path: '/configTable/edit/:id',
      name: '编辑用户',
      component: () => import('@app/views/demo/configList/add'),
    },
    {
      path: '/configTable/auth/:id',
      name: '路由权限设置',
      component: () => import('@app/views/demo/configList/auth'),
    },
  ],
};
