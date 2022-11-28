import getTheme from '@app/utils/getTheme';

export const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const sysThemeMode = setTheme => {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', e => {
    setTheme(getTheme());
  }, false);
};

export default sysThemeMode;