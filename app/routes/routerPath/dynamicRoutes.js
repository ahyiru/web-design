import {browserRouter} from '@app/configs';
import pageSchema from '@app/utils/getPageSchema';

export const appRoutes = {
  path: '/apps',
  name: ' App',
  icon: 'AppstoreAddOutlined',
  children: [
    {
      path: '/projects',
      name: '项目管理',
      icon: 'ConsoleSqlOutlined',
      componentPath: '/apps/projects',
    },
    {
      path: '/projects/add',
      name: '添加项目',
      hideMenu: true,
      componentPath: '/apps/projects/add',
    },
    {
      path: '/projects/edit/:projectId',
      name: '编辑项目',
      componentPath: '/apps/projects/add',
    },
    {
      path: '/projects/router/:projectId',
      name: '项目路由设置',
      componentPath: '/apps/projects/router',
    },
    {
      path: '/projects/router/:projectId/:routerId',
      name: '页面设计',
      componentPath: '/apps/projects/router/design',
    },
    {
      path: '/projects/api/:projectId',
      name: '项目接口管理',
      componentPath: '/apps/projects/apis',
    },
    {
      path: '/projects/api/:projectId/add',
      name: '添加接口',
      componentPath: '/apps/projects/apis/add',
    },
    {
      path: '/projects/api/:projectId/edit/:id',
      name: '编辑接口',
      componentPath: '/apps/projects/apis/add',
    },
    {
      path: '/projects/api/:projectId/test/:id',
      name: '接口测试',
      componentPath: '/apps/projects/apis/test',
    },
    {
      path: '/users',
      name: '用户管理',
      icon: 'UsergroupAddOutlined',
      componentPath: '/apps/users',
    },
    {
      path: '/users/add',
      name: '添加用户',
      hideMenu: true,
      componentPath: '/apps/users/add',
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      componentPath: '/apps/users/add',
    },
    {
      path: '/users/auth/:id',
      name: '路由权限设置',
      componentPath: '/apps/users/auth',
    },
    {
      path: '/profile',
      name: '个人中心',
      title: '个人中心',
      hideMenu: true,
      componentPath: '/apps/users/profile',
    },
    {
      path: '/apis',
      name: '接口管理',
      icon: 'ClusterOutlined',
      componentPath: '/apps/projects/apis',
    },
    {
      path: '/apis/add',
      name: '添加接口',
      hideMenu: true,
      componentPath: '/apps/projects/apis/add',
    },
    {
      path: '/apis/edit/:id',
      name: '编辑接口',
      componentPath: '/apps/projects/apis/add',
    },
    {
      path: '/apis/test/:id',
      name: '接口测试',
      componentPath: '/apps/projects/apis/test',
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
          componentPath: '/commons/suspense',
        },
        {
          path: '/errorboundary',
          name: 'errorboundary',
          componentPath: '/commons/suspense/errorboundary',
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
          componentPath: '/commons/canvas',
        },
        {
          path: '/d3',
          name: 'd3',
          componentPath: '/commons/canvas/d3',
        },
        {
          path: '/webgl',
          name: 'webgl',
          componentPath: '/commons/canvas/webgl',
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
          path: '/dragable',
          name: 'dragable',
          componentPath: '/commons/canvas/dragable',
        },
      ],
    },
    {
      path: '/graph',
      name: '图形可视化',
      icon: 'FundOutlined',
      componentPath: '/commons/graph/graphin',
    },
    {
      path: '/editor',
      name: '富文本编辑器',
      icon: 'EditOutlined',
      componentPath: '/commons/slate/test1',
    },
    {
      path: '/virtualList',
      name: '虚拟列表',
      icon: 'UnorderedListOutlined',
      componentPath: '/commons/virtualList',
    },
    {
      path: '/components',
      name: '组件',
      icon: 'LayoutOutlined',
      children: [
        {
          path: '/table',
          name: 'table',
          icon: 'TableOutlined',
          componentPath: '/apps/users',
        },
        {
          path: '/table/add',
          name: '添加用户',
          hideMenu: true,
          componentPath: '/apps/users/add',
        },
        {
          path: '/table/edit/:id',
          name: '编辑用户',
          componentPath: '/apps/users/add',
        },
      ],
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
      componentPath: '/dashboard/screen1',
    },
    {
      path: '/screen2',
      name: 'screen2',
      icon: 'DashboardOutlined',
      componentPath: '/dashboard/screen2',
    },
  ],
};
export const configRoutes = {
  path: '/layout',
  name: '框架配置',
  icon: 'LayoutOutlined',
  componentPath: '/layout',
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
      componentPath: '/lowCode',
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/ui',
      name: 'UI组件',
      icon: 'CodeOutlined',
      componentPath: '/lowCode',
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users',
      name: '业务组件',
      icon: 'CodeOutlined',
      componentPath: '/lowCode',
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users/add',
      name: '新增用户',
      componentPath: '/lowCode',
      hideMenu: true,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      componentPath: '/lowCode',
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
      componentPath: '/page',
    },
    {
      path: '/page1-2',
      name: '二级菜单2',
      children: [
        {
          path: '/page1-2-1',
          name: '三级菜单1',
          icon: 'RobotOutlined',
          componentPath: '/page',
        },
        {
          path: '/page1-2-2',
          name: '三级菜单2',
          children: [
            {
              path: '/page1-2-2-1',
              name: '四级菜单1',
              componentPath: '/page',
            },
            {
              path: '/page1-2-2-2',
              name: '四级菜单1-disabled',
              componentPath: '/page',
              linkProps: {
                disabled: true,
              },
            },
            {
              path: '/page1-2-2-3',
              name: '四级菜单3-_blank',
              componentPath: '/page',
              linkProps: {
                target: '_blank',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/page1-3',
      name: '二级菜单3',
      icon: 'RobotOutlined',
      componentPath: '/page',
    },
  ],
};
export const playgroundRoutes = {
  path: '/playground',
  name: ' Playground',
  icon: 'ConsoleSqlOutlined',
  children: [
    {
      path: '/demo',
      name: 'demo',
      icon: 'MergeCellsOutlined',
      denied: browserRouter,
      componentPath: '/demo',
    },
    {
      path: '/tools',
      name: '常用工具',
      icon: 'ToolOutlined',
      denied: browserRouter,
      children: [
        {
          path: '/demo1',
          name: 'demo1',
          component: () => import(`@app/draft/tools/demo1`),
        },
        {
          path: '/demo2',
          name: 'demo2',
          component: () => import(`@app/draft/tools/demo2`),
        },
      ],
    },
    {
      path: '/icons',
      name: 'icons',
      icon: 'PictureOutlined',
      componentPath: '/demo/icons',
    },
    {
      path: '/md2html',
      name: 'md2html',
      componentPath: '/demo/md2html',
    },

    {
      path: '/list',
      name: 'list',
      componentPath: '/demo/list',
    },
    {
      path: '/list/add',
      name: '添加用户',
      hideMenu: true,
      componentPath: '/demo/list/add',
    },
    {
      path: '/list/edit/:id',
      name: '编辑用户',
      componentPath: '/demo/list/add',
    },
    {
      path: '/list/auth/:id',
      name: '路由权限设置',
      componentPath: '/demo/list/auth',
    },
    {
      path: '/panel',
      name: 'panel',
      componentPath: '/demo/panel',
    },
    {
      path: '/styles',
      name: 'styles',
      componentPath: '/demo/styles',
    },
    {
      path: '/modal',
      name: 'modal',
      componentPath: '/demo/modal',
    },
    {
      path: '/demo-tools',
      name: 'tools',
      componentPath: '/demo/tools',
    },
    {
      path: '/bagua',
      name: 'bagua',
      componentPath: '/demo/bagua',
    },
  ],
};
