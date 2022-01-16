import getThemeList from '@app/configs/theme';
import storage from 'ihuxy-utils/storage';

const getTheme = (i18ns) => {
  const themeList = typeof getThemeList === 'function' ? getThemeList(i18ns?.theme) : [];
  const theme = storage.get('theme') || themeList[0] || {};
  return theme;
};

export default getTheme;
