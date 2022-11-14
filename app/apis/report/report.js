import {osType, getExplore} from '@huxy/utils';

import {routeStore} from '@huxy/router';

import {browserRouter} from '@app/configs';

import {isAuthed} from '@app/utils/utils';

import apiList from '@app/utils/getApis';

const {name, version} = require('../../../package.json');

const [browserType, browserVersion] = getExplore().split(': ');

const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const info = {
  osType: osType(),
  browserType,
  browserVersion,
  language: window.navigator.language,
  netType: connection?.type,
  evn: browserRouter ? 'prod' : 'dev',
  appName: name,
  appVersion: version,
};

const report = params => {
  if (!isAuthed()) {
    return;
  }
  const routeInfo = routeStore.getState();
  const reportInfo = {
    ...info,
    ...params,
    route: '/',
    routeName: 'Home',
  };
  if (routeInfo) {
    const {path, name} = routeInfo.current.slice(-1)[0] ?? {};
    const route = browserRouter ? path : path.slice(1);
    reportInfo.route = route;
    reportInfo.routeName = name;
  }
  apiList.addReportFn?.(reportInfo);
};


export default report;