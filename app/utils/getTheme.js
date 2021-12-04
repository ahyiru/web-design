import getThemeList from '@app/configs/theme';
import {utils} from '@common';
const {storage}=utils;

const getTheme=i18ns=>{
  const themeList=typeof getThemeList==='function'?getThemeList(i18ns?.theme):[];
  const theme=storage.get('theme')||themeList[0]||{};
  return theme;
};

export default getTheme;

