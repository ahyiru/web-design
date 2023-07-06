import slateRoutes from './src/slate/routes';
import configListRoutes from './src/configList/routes';
import pageRoutes from './src/page/routes';
// import messagesRoutes from './src/messages/routes';

const routes = {
  path: '/playground',
  name: 'Playground',
  icon: 'ToolOutlined',
  children: [
    ...slateRoutes,
    ...configListRoutes,
    // ...messagesRoutes,
    {
      path: '/suspense',
      name: 'suspense',
      icon: 'CoffeeOutlined',
      children: [
        {
          path: '/suspense',
          name: 'suspense',
          component: () => import('./src/suspense'),
        },
        {
          path: '/errorboundary',
          name: 'errorboundary',
          component: () => import('./src/suspense/errorboundary'),
        },
      ],
    },
    {
      path: '/canvas',
      name: '图形绘制',
      icon: 'PictureOutlined',
      children: [
        {
          path: '/canvas',
          name: 'canvas',
          component: () => import('./src/canvas'),
        },
        {
          path: 'http://ihuxy.com:8081/',
          name: 'webgl',
          linkProps: {
            target: '_blank',
          },
        },
      ],
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
    ...pageRoutes,
    {
      path: '/functions',
      name: 'functions',
      icon: 'CoffeeOutlined',
      children: [
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./src/functions/icons'),
        },
        {
          path: '/panel',
          name: 'panel',
          component: () => import('./src/functions/panel'),
        },
        {
          path: '/styles',
          name: 'styles',
          component: () => import('./src/functions/styles'),
        },
        {
          path: '/modal',
          name: 'modal',
          component: () => import('./src/functions/modal'),
        },
        {
          path: '/tools',
          name: 'tools',
          component: () => import('./src/functions/tools'),
        },
      ],
    },
  ],
};

export default routes;
