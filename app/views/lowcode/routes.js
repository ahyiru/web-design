import pageSchema from '@app/utils/getPageSchema';

import LowCode from './src';

const routes = {
  path: '/low-code',
  name: '低代码',
  icon: 'CodeOutlined',
  children: [
    {
      path: '/dom',
      name: '原生dom',
      icon: 'CoffeeOutlined',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/ui',
      name: 'UI组件',
      icon: 'DesktopOutlined',
      component: LowCode,
      loadData: {
        pageSchema,
      },
    },
    {
      path: '/users',
      name: '业务组件',
      icon: 'ClusterOutlined',
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

export default routes;
