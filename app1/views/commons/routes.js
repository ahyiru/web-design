import slateRoutes from './src/slate/routes';

const routes = {
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
      icon: 'AreaChartOutlined',
      children: [
        {
          path: '/canvas',
          name: 'canvas',
          component: () => import('./src/canvas'),
        },
        {
          path: '/d3',
          name: 'd3',
          component: () => import('./src/canvas/d3'),
        },
        /* {
          path: '/webgl',
          name: 'webgl',
          component: () => import('./src/canvas/webgl'),
        }, */
        {
          path: 'http://ihuxy.com:8081/',
          name: 'webgl',
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
          component: () => import('./src/canvas/dragable'),
        },
      ],
    },
    {
      path: '/graph',
      name: 'graphin',
      icon: 'FundOutlined',
      component: () => import('./src/graph'),
    },
    {
      path: '/x6-demo',
      name: 'x6',
      icon: 'FundOutlined',
      component: () => import('./src/x6-demo/pages'),
    },
    ...slateRoutes,
    {
      path: '/virtualList',
      name: '虚拟列表',
      icon: 'UnorderedListOutlined',
      component: () => import('./src/virtualList'),
    },
  ],
};

export default routes;
