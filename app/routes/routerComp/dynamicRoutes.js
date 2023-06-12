import layoutRoutes from '@app/views/layout/routes';
import appRoutes from '@app/views/apps/routes';
import commonRoutes from '@app/views/commons/routes';
import dashboardRoutes from '@app/views/dashboard/routes';
import lowcodeRoutes from '@app/views/lowcode/routes';
import pageRoutes from '@app/views/page/routes';
import playgroundRoutes from '@app/views/playground/routes';
import payerRoutes from '@app/views/payer/routes';
import messageRoutes from '@app/views/message/routes';
import filesRoutes from '@app/views/files/routes';

const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: () => import('@app/views/user/src/profile'),
};

export default [layoutRoutes, appRoutes, lowcodeRoutes, ...dashboardRoutes, payerRoutes, filesRoutes, commonRoutes, playgroundRoutes, pageRoutes, ...messageRoutes, profileRoutes];
