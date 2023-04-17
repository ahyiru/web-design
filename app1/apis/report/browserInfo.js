import {getOsInfo, getExplore} from '@huxy/utils';
import {browserRouter} from '@app/configs';

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

export default info;
