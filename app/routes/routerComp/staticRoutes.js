import {notAdmin} from '@app/utils/isAdmin';
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
  {
    path: '/wschat',
    name: '聊天室',
    title: '聊天室',
    hideMenu: true,
    component: () => import('@app/views/wschat/src'),
  },
];

export default routes;
