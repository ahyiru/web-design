import {getOsInfo, getExplore} from '@huxy/utils';

import {getRoute} from '@huxy/router';

import {browserRouter} from '@app/configs';

import {isAuthed} from '@app/utils/utils';

import apiList from '@app/utils/getApis';

import pkg  from '../../../package.json';

const {type: osType, version: osVersion, model: osModel} = getOsInfo();
const {type: browserType, version: browserVersion} = getExplore();

const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const info = {
  osType,
  osVersion,
  osModel,
  browserType,
  browserVersion,
  language: window.navigator.language,
  netType: connection?.type,
  evn: browserRouter ? 'prod' : 'dev',
  appName: pkg.name,
  appVersion: pkg.version,
};

const report = params => {
  if (!isAuthed()) {
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