import {utils} from '@common';
import getThemeList from '@app/configs/theme';

const {storage}=utils;

export const setTheme=(store,i18ns)=>{
  // const i18ns=store.getState('i18ns');
  const themeList=typeof getThemeList==='function'?getThemeList(i18ns?.theme):[];
  const defTheme=storage.get('theme')||themeList[0];
  store.setState({'huxy-theme':defTheme});
};

