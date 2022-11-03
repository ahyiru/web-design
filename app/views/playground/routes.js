import {browserRouter} from '@app/configs';

const routes = {
  path: '/playground',
  name: 'Playground',
  icon: 'ConsoleSqlOutlined',
  children: [
    {
      path: '/materials',
      name: 'css 物料',
      children: [
        {
          path: '/animation',
          name: '动效',
          component: () => import(`./src/materials/animation`),
        },
        {
          path: '/border',
          name: '边框',
          component: () => import(`./src/materials/border`),
        },
        {
          path: '/chart',
          name: '图表',
          component: () => import(`./src/materials/chart`),
        },
        {
          path: '/shape',
          name: '形状',
          component: () => import(`./src/materials/shape`),
        },
        {
          path: '/text',
          name: '文本',
          component: () => import(`./src/materials/text`),
        },
      ],
    },
    {
      path: '/icons',
      name: 'icons',
      icon: 'PictureOutlined',
      component: () => import('./src/icons'),
    },
    {
      path: '/md2html',
      name: 'md2html',
      component: () => import('./src/md2html'),
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('./src/panel'),
    },
    {
      path: '/styles',
      name: 'styles',
      component: () => import('./src/styles'),
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('./src/modal'),
    },
    {
      path: '/demo-tools',
      name: 'tools',
      component: () => import('./src/tools'),
    },
    {
      path: '/configTable',
      name: 'configTable',
      component: () => import('./src/configList'),
    },
    {
      path: '/configTable/add',
      name: '添加用户',
      hideMenu: true,
      component: () => import('./src/configList/add'),
    },
    {
      path: '/configTable/edit/:id',
      name: '编辑用户',
      component: () => import('./src/configList/add'),
    },
    {
      path: '/configTable/auth/:id',
      name: '路由权限设置',
      component: () => import('./src/configList/auth'),
    },
  ],
};

export default routes;
