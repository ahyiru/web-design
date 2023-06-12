import {traverItem, arr2TreeByPath, mergeArr} from '@huxy/utils';

import {notAdmin, isMember} from '@app/utils/isAdmin';

import Icon from '@app/components/icon';

import designRoutes from '@app/views/design/routes';

import lowcode from '@app/views/lowcode/configs';

import staticRoutes from './routerComp/staticRoutes';
import dynamicRoutes from './routerComp/dynamicRoutes';
import whiteList from './whiteList';
import defaultPermList from './defaultPermList';

const allRoutes = [
  {
    path: '/',
    component: () => import('@app/commons/layout'),
    children: [...dynamicRoutes, ...designRoutes],
  },
  ...staticRoutes,
];

const routes = (routerList, nameList, permList, profile) => {
  const isAdmin = !notAdmin();
  const serverRoutes = traverItem(({denied, ...rest}) => {
    rest.fullpath = rest.path;
    if (rest.parentId.length > 1) {
      rest.path = rest.path.replace(rest.parentId, '');
    }
    return rest;
  })(arr2TreeByPath(routerList));

  const fullList = mergeArr(allRoutes, serverRoutes, 'path');

  const permission = [...new Set([...(permList || []), ...whiteList, ...defaultPermList])];

  return traverItem((item, parent) => {
    item.id = item._id;
    item.name = nameList?.[item.fullpath] ?? item.name;
    let icon = item.icon;
    if (icon && icon !== true) {
      item.icon = <Icon icon={icon} />;
    }
    const isLowcode = typeof item.component === 'string' && item.component;
    if (isLowcode) {
      item.component = lowcode.component;
      item.loadData = lowcode.loadData;
    }
    if (typeof item.denied === 'function') {
      item.denied = item.denied();
    }
    if (!isAdmin && !isLowcode) {
      item.denied = item.denied || !permission.includes(item.fullpath);
    }
  })(fullList);
};

export default routes;
