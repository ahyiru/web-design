import {useCallback, useState, useEffect} from 'react';
import {storage} from '@huxy/utils';

import themeType from '../configs/themeType';

import {sysThemeMode} from './';

const useTheme = () => {
  const [themeToken, setThemeToken] = useState(themeType[0]);

  const switchTheme = useCallback(token => {
    const theme = token.key === 'light' ? themeType[1] : themeType[0];
    setThemeToken(theme);
    storage.set('chat-theme-token', theme);
  }, []);

  useEffect(() => {
    sysThemeMode(isDark => setThemeToken(isDark ? themeType[1] : storage.get('chat-theme-token') ?? themeType[0]));
  }, []);

  return [themeToken, switchTheme];
};

export default useTheme;
