import configs from './configs';

const routes = {
  path: '/low-code',
  name: '低代码',
  icon: 'CodeOutlined',
  children: [
    {
      path: '/dom',
      name: '原生dom',
      icon: 'CoffeeOutlined',
      ...configs,
    },
    {
      path: '/ui',
      name: 'UI组件',
      icon: 'DesktopOutlined',
      ...configs,
    },
    {
      path: '/users',
      name: '业务组件',
      icon: 'ClusterOutlined',
      ...configs,
    },
    {
      path: '/users/add',
      name: '新增用户',
      hideMenu: true,
      ...configs,
    },
    {
      path: '/users/edit/:id',
      name: '编辑用户',
      ...configs,
    },
  ],
};

export default routes;
