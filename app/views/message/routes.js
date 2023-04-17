// import {notAdmin} from '@app/utils/isAdmin';

const routes = [
  {
    path: '/messages',
    name: '消息管理',
    hideMenu: true,
    component: () => import('./src'),
  },
];

export default routes;
