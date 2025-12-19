import {storage, fixPath} from '@huxy/utils';
import apiList from '@app/apis/apiList';
import {basepath, browserRouter} from '@app/configs';

export const goPage = (url = '') => (location.href = url ? fixPath(browserRouter ? `${basepath}${url}` : `${basepath}/#/${url}`) : basepath || '/');

export const logout = isLogout => {
  /* try {
    !isLogout && apiList.logoutFn();
  } catch (err) {}
  storage.rm('token');
  goPage('/user/signin'); */
};

export const isAuthed = () => true;//storage.get('token');
