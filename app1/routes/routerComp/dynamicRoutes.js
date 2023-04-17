import layoutRoutes from '@app/views/layout/routes';
import appRoutes from '@app/views/apps/routes';
import commonRoutes from '@app/views/commons/routes';
import dashboardRoutes from '@app/views/dashboard/routes';
import lowcodeRoutes from '@app/views/lowcode/routes';
import pageRoutes from '@app/views/page/routes';
import playgroundRoutes from '@app/views/playground/routes';

const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: () => import('@app/views/apps/src/users/profile'),
};

export default [layoutRoutes, appRoutes, commonRoutes, dashboardRoutes, lowcodeRoutes, playgroundRoutes, pageRoutes, profileRoutes];
