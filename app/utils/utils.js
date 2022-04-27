import {storage} from '@huxy/utils';

import apiList from '@app/utils/getApis';

// import configs from '@app/configs';

export const logout = (isLogout) => {
  !isLogout && apiList.logoutFn();
  storage.rm('token');
  // location.href=configs.browserRouter?'/user/signin':'#/user/signin';
  location.href = '/';
};

export const isAuthed = () => storage.get('token');
