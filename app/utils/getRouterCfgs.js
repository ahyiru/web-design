import {i18nsStore, userInfoStore, permissionStore, routersStore} from '@app/store/stores';
import getRoutes from './getRoutes';

const getRouterCfgs = () => {
  const i18ns = i18nsStore.getState();
  const profile = userInfoStore.getState();
  const permission = permissionStore.getState();
  const routerList = routersStore.getState();
  return {routers: getRoutes({profile, i18ns, permission, routerList}), title: i18ns.title};
};

export default getRouterCfgs;
