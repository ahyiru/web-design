import userRoutes from '@app/views/user/routes';

const routes = [
  ...userRoutes,
  {
    path: '/404',
    name: '404',
    component: import('@app/views/404'),
    hideMenu: true,
  },
  {
    path: '/preview',
    name: '预览',
    hideMenu: true,
    component: () => import('@app/views/apps/src/projects/router/design/preview'),
  },
  {
    path: '/md2html',
    name: '文档',
    hideMenu: true,
    component: () => import('@app/views/playground/src/md2html'),
  },
  {
    path: '/x6-demo/:id',
    name: 'x6',
    hideMenu: true,
    component: () => import('@app/views/commons/src/x6-demo/pages'),
  },
  {
    path: '/bigscreen',
    name: 'bigscreen',
    hideMenu: true,
    component: () => import('@app/views/dashboard/src/bigscreen'),
  },
  {
    path: '/carmodel',
    name: 'carmodel',
    hideMenu: true,
    component: () => import('@app/views/dashboard/src/carmodel'),
  },
];

export default routes;
