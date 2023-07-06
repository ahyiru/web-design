import {notAdmin} from '@app/utils/isAdmin';

const routes = [
  {
    path: '/messages',
    name: '消息管理',
    hideMenu: true,
    component: () => import('./src'),
  },
  {
    path: '/send-messages',
    name: '发送信息',
    icon: 'SendOutlined',
    hideMenu: true,
    denied: notAdmin,
    component: () => import('./src/send'),
  },
  {
    path: '/online',
    name: '在线用户',
    icon: 'TeamOutlined',
    hideMenu: true,
    denied: notAdmin,
    component: () => import('./src/online'),
  },
];

export default routes;
