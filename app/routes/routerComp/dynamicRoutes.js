import layoutRoutes from '@app/views/layout/routes';
import appRoutes from '@app/views/apps/routes';
import dashboardRoutes from '@app/views/dashboard/routes';
import lowcodeRoutes from '@app/views/lowcode/routes';
import promptRoutes from '@app/views/prompt/routes';
import payerRoutes from '@app/views/payer/routes';
import messageRoutes from '@app/views/message/routes';
import filesRoutes from '@app/views/files/routes';
import demandRoutes from '@app/views/demand/routes';
import playgroundRoutes from '@app/views/playground/routes';

const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: () => import('@app/views/user/src/profile'),
};

export default [layoutRoutes, appRoutes, lowcodeRoutes, ...dashboardRoutes, payerRoutes, filesRoutes, demandRoutes, promptRoutes, playgroundRoutes, ...messageRoutes, profileRoutes];
