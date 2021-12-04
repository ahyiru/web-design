import {
  dark,
  dark1,
  light,
  light1,
  portal,
  lightPortal,
  gradient,
} from './themes';

const themeList=nameList=>[
  {
    name:nameList?.['dark']??'dark',
    key:'dark',
    list:dark,
    type:'theme',
  },
  {
    name:nameList?.['dark1']??'dark1',
    key:'dark1',
    list:dark1,
    type:'theme',
  },
  {
    name:nameList?.['light']??'light',
    key:'light',
    list:light,
    type:'theme',
  },
  {
    name:nameList?.['light1']??'light1',
    key:'light1',
    list:light1,
    type:'theme',
  },
  {
    name:nameList?.['portal']??'portal',
    key:'portal',
    list:portal,
    type:'theme',
  },
  {
    name:nameList?.['lightPortal']??'lightPortal',
    key:'lightPortal',
    list:lightPortal,
    type:'theme',
  },
  {
    name:nameList?.['gradient']??'gradient',
    key:'gradient',
    list:gradient,
    type:'theme',
  },
];

export default themeList;

