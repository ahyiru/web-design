import {browserRouter} from '@app/configs';

import configListRoutes from './src/configList/routes';
import messagesRoutes from './src/messages/routes';

const routes = {
  path: '/playground',
  name: 'Playground',
  icon: 'ConsoleSqlOutlined',
  children: [
    {
      path: '/chatGPT',
      name: 'chatGPT',
      icon: 'PictureOutlined',
      component: () => import('./src/chatGPT'),
    },
    {
      path: '/demo',
      name: 'demo',
      icon: 'MergeCellsOutlined',
      denied: browserRouter,
      injectSomeValues: 'injectSomeValues',
      component: () => import('./src'),
    },
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
    ...configListRoutes,
    ...messagesRoutes,
  ],
};

export default routes;
