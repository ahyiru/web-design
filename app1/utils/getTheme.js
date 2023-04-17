import {storage} from '@huxy/utils';
import getThemeList from '@app/configs/theme';
import {getIntls} from '@app/components/intl';
import {isDarkMode} from '@app/utils/sysThemeMode';

const getTheme = (key = null) => {
  const themeList = typeof getThemeList === 'function' ? getThemeList(getIntls) : [];
  if (key != null) {
    return themeList.find(item => item.key === key) ?? themeList[0] ?? {};
  }
  const theme = storage.get('theme') ?? themeList[0] ?? {};
  return isDarkMode() ? themeList[0] ?? {} : theme;
};

export default getTheme;
