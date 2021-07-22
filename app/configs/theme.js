import {
  defaults,
  dark,
  light,
  portal,
  lightPortal,
} from './themes';

const themeList=nameList=>[
  {
    name:nameList['defaults'],
    key:'defaults',
    list:defaults,
    type:'theme',
  },
  {
    name:nameList['dark'],
    key:'dark',
    list:dark,
    type:'theme',
  },
  {
    name:nameList['light'],
    key:'light',
    list:light,
    type:'theme',
  },
  {
    name:nameList['portal'],
    key:'portal',
    list:portal,
    type:'theme',
  },
  {
    name:nameList['lightPortal'],
    key:'lightPortal',
    list:lightPortal,
    type:'theme',
  },
];

export default themeList;

