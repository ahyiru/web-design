// import {notAdmin} from '@app/utils/isAdmin';

const routes = {
  path: '/files',
  name: '文件管理',
  icon: 'FileDoneOutlined',
  // denied: notAdmin,
  component: () => import('./src'),
};

export default routes;
