import {setStyle} from '@huxy/utils';

const setGlobalVar = theme => {
  const globalVar = {...theme?.list?.colors, ...theme?.list?.sizes};
  setStyle(document.documentElement, globalVar);
};

export default setGlobalVar;
