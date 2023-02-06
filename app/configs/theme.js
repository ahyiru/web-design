import {dark, dark1, light, light1, portal1, portal} from './themes';

import * as themes from './themes/themes';

const themeList = getIntls => [
  {
    name: getIntls('theme.dark', 'dark'),
    key: 'dark',
    list: dark,
    type: 'theme',
  },
  {
    name: getIntls('theme.dark1', 'dark1'),
    key: 'dark1',
    list: dark1,
    type: 'theme',
  },
  {
    name: getIntls('theme.light', 'light'),
    key: 'light',
    list: light,
    type: 'theme',
  },
  {
    name: getIntls('theme.light1', 'light1'),
    key: 'light1',
    list: light1,
    type: 'theme',
  },
  {
    name: getIntls('theme.portal', 'portal'),
    key: 'portal',
    list: portal,
    type: 'theme',
  },
  {
    name: getIntls('theme.portal1', 'portal1'),
    key: 'portal1',
    list: portal1,
    type: 'theme',
  },
  ...Object.keys(themes).map(key => ({
    name: key,
    key,
    list: themes[key],
    type: 'theme',
  })),
];

export default themeList;
