import {formatTime} from '@huxy/utils';

import * as globalCfgs from './configs';

const setGlobalConfigs = () => {
  window.utils = {formatTime};
  window.configs = globalCfgs;
};

export default setGlobalConfigs;
