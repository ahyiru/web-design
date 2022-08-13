import {storage} from '@huxy/utils';
import getThemeList from '@app/configs/theme';
import {getIntls} from '@app/components/intl';

const getTheme = () => {
  const themeList = typeof getThemeList === 'function' ? getThemeList(getIntls) : [];
  const theme = storage.get('theme') || themeList[0] || {};
  return theme;
};

export default getTheme;
