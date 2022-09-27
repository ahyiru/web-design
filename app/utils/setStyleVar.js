import {setStyle} from '@huxy/utils';

const setStyleVar = (theme, ele = document.documentElement) => {
  const styleVars = {...theme?.list?.colors, ...theme?.list?.sizes};
  setStyle(ele, styleVars);
};

export default setStyleVar;
