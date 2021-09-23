import permRouter from '@app/utils/permRouter';
import routers from '@app/routers';

const getRouters=({profile,i18ns,permission,routerList})=>profile?.role==5?routers(i18ns.router,routerList):permRouter(routers(i18ns.router,routerList),permission);

export default getRouters;


