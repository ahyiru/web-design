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
    component: () => import('@app/views/apps/projects/router/design/preview'),
  },
  {
    path: '/panorama',
    name: 'panorama',
    hideMenu: true,
    component: () => import('@app/views/commons/canvas/panorama'),
  },
  {
    path: '/x6-demo/:id',
    name: 'x6',
    hideMenu: true,
    component: () => import('@app/views/commons/x6-demo/pages'),
  },
  /* {
    path: '/scenes/:name',
    name: '场景展示',
    hideMenu: true,
    component: props => <h1>{props.inputPath}</h1>,
  }, */
];

export default routes;
