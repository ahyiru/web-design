import {formatTime} from '@huxy/utils';

import * as configs from './configs';

const setGlobalConfigs = (globalCfgs = configs) => {
  window.utils = {formatTime};
  window.configs = globalCfgs;
};

export default setGlobalConfigs;
