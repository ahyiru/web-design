import {traverItem} from '@huxy/utils';

import staticRoutes from './routerComp/staticRoutes';
import * as dynamicRoutes from './routerComp/dynamicRoutes';

import designRoutes from '@app/views/design/routes';

const {configRoutes, ...restRoutes} = dynamicRoutes;

const routers = Object.keys(restRoutes).map(key => restRoutes[key]);

const allRoutes = [
  {
    path: '/',
    component: () => import('@commons/layout'),
    children: [configRoutes, ...routers, ...designRoutes],
  },
  ...staticRoutes,
];

const routes = (nameList, routerList) =>
  traverItem((item, parent) => {
    const fullPath = [...parent, item]
      .map(item => item.path)
      .join('')
      .replace('//', '/');
    item.name = nameList?.[fullPath] ?? item.name;
    item.id = item.id ?? routerList?.find(route => route.path === fullPath)?._id;
    /* if (typeof item.componentPath === 'string') {
      item.component = () => import(`@app/views${item.componentPath}`);
    } */
  })(allRoutes);

export default routes;
