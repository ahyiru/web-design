import {traverItem} from '@huxy/utils';

import Icon from '@app/components/icon';

import staticRoutes from './routerComp/staticRoutes';
import dynamicRoutes from './routerComp/dynamicRoutes';

import designRoutes from '@app/views/design/routes';

const allRoutes = [
  {
    path: '/',
    component: () => import('@app/commons/layout'),
    children: [...dynamicRoutes, ...designRoutes],
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
    if (item.icon && item.icon !== true) {
      item.icon = <Icon icon={item.icon} />;
    }
    if (typeof item.denied === 'function') {
      item.denied = item.denied();
    }
    /* if (typeof item.componentPath === 'string') {
      item.component = () => import(`@app/views${item.componentPath}`);
    } */
  })(allRoutes);

export default routes;
