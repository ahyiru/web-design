import {i18nsStore, /* userInfoStore, permissionStore, */ routersStore} from '@app/store/stores';
// import getRoutes from './getRoutes';

import routes from '@app/routes';

const getRouterCfgs = () => {
  const i18ns = i18nsStore.getState();
  // const profile = userInfoStore.getState();
  // const permission = permissionStore.getState();
  const routerList = routersStore.getState();
  return {routers: routes(i18ns.router, routerList), title: i18ns.title};
};

export default getRouterCfgs;
