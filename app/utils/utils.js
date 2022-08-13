import {storage} from '@huxy/utils';

import apiList from '@app/utils/getApis';

export const logout = isLogout => {
  !isLogout && apiList.logoutFn();
  storage.rm('token');
  location.href = '/';
};

export const isAuthed = () => storage.get('token');
