import {routersStore, i18nsStore, permissionStore} from '@app/store/stores';

import routes from '@app/routes';

const getRouterCfgs = () => {
  const i18ns = i18nsStore.getState();
  const permission = permissionStore.getState();
  const routerList = routersStore.getState();
  return {routers: routes(routerList, i18ns.router, permission), title: i18ns.title};
};

export default getRouterCfgs;
