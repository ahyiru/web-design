import {getParams, storage} from '@huxy/utils';
import initSW from '@app/sw';

const init = () => {
  // service worker
  initSW();

  // location
  const {params} = getParams(location.href);
  if (params?.authed_token) {
    storage.set('token', params.authed_token);
  }
};

export default init;
