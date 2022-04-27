import {formatTime} from '@huxy/utils';

import * as configs from './config';

const setGlobalConfigs = () => {
  window.utils = {formatTime};
  window.configs = configs;
};

export default setGlobalConfigs;
