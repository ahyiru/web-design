import {setStyle, hex2rgba} from '@huxy/utils';

const getRgb = rgb => {
  if (rgb.includes('rgb')) {
    const matched = rgb.match(/rgba?\((.+)\)/);
    if (matched) {
      return matched[1].split(',').map(v => v.trim()).slice(0, 3).join();
    }
  }
  return rgb;
};

const setStyleVar = (theme, ele = document.documentElement) => {
  const navBgColor = theme?.list?.colors?.['--navBgColor'];
  const menuBgColor = theme?.list?.colors?.['--menuBgColor'];
  const navBgRgb = getRgb(hex2rgba(navBgColor));
  const menuBgRgb = getRgb(hex2rgba(menuBgColor));
  const styleVars = {...theme?.list?.colors, ...theme?.list?.sizes, '--navBgRgb': navBgRgb, '--menuBgRgb': menuBgRgb};
  setStyle(ele, styleVars);
};

export default setStyleVar;
