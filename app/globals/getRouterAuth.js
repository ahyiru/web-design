import {getParams, storage} from '@huxy/utils';

const getRouterAuth = () => {
  const {params} = getParams(location.href);
  if (params?.authed_token) {
    storage.set('token', params.authed_token);
  }
};

export default getRouterAuth;
