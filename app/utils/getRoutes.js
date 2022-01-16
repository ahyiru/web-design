import permRoutes from '@app/utils/permRoutes';
import routes from '@app/routes';

const getRoutes = ({profile, i18ns, permission, routerList}) => (profile?.role == 5 ? routes(i18ns.router, routerList) : permRoutes(routes(i18ns.router, routerList), permission));

export default getRoutes;
