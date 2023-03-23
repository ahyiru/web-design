import {getRoute} from '@huxy/router';

import {browserRouter} from '@app/configs';

import {isAuthed} from '@app/utils/utils';

import apiList from '@app/utils/getApis';

import info from './browserInfo';

const report = params => {
  if (!browserRouter || !isAuthed()) {
    return;
  }
  const routeInfo = getRoute();
  const routes = routeInfo ? routeInfo.current.slice(-1)[0] ?? {} : {};
  const {path, name, ...restParams} = params;
  const currentPath = routes.path ?? path ?? '';
  const reportInfo = {
    ...info,
    ...restParams,
    route: browserRouter ? currentPath : currentPath.slice(1),
    routeName: routes.name ?? name,
  };
  apiList.addReportFn?.(reportInfo);
};

export default report;
