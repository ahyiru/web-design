import {storage} from '@huxy/utils';
import getThemeList from '@app/configs/theme';
import {getIntls} from '@app/components/intl';

const getTheme = (index = null) => {
  const themeList = typeof getThemeList === 'function' ? getThemeList(getIntls) : [];
  if (index != null) {
    return themeList[index] ?? themeList[0] ?? {};
  }
  const theme = storage.get('theme') ?? themeList[0] ?? {};
  return theme;
};

export default getTheme;
