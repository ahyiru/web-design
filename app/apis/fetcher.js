import {fetcher, storage, wrapPromise, message as msgAlert} from '@huxy/utils';
// import {message as msgAlert} from '@app/utils/staticFunction';

import {PROXY} from '@app/configs';

import {logout} from '@app/utils/utils';

const TARGET = Array.isArray(PROXY) ? PROXY[0]?.prefix : PROXY?.prefix ?? '/api';

const success_code = [200, 10000];

const handler = response => {
  /* if(response.status===401){
    message.error(response.statusText);
    logout(true);
    return;
  }
  if(!success_code.includes(response.status)){
    message.error(response.statusText);
    throw response.statusText;
  } */
  return response
    .json()
    .then(result => {
      result.code = result.code ?? response.status;
      result.message = result.message ?? result.msg ?? response.statusText;
      const {message, code} = result;
      if (code === 401) {
        logout(true);
        throw {code, message};
      }
      if (!success_code.includes(code)) {
        throw {code, message};
      }
      return result;
    })
    .catch(error => {
      msgAlert.error(error.message);
      throw error;
    });
};

const handleStream = response => {
  if (response.status !== 200) {
    msgAlert.error(response.statusText);
    throw {message: response.statusText};
  }
  return response.body;
};

const dlHandler = response => {
  if (response.status !== 200) {
    msgAlert.error(response.statusText);
    throw {message: response.statusText};
  }
  const disposition = response.headers.get('Content-Disposition');
  // const filename=decodeURIComponent(disposition.split(';')[1].split('=')[1]);
  const fileInfo = decodeURIComponent(disposition);
  return response
    .blob()
    .then(result => {
      result.code = result.code ?? response.status;
      const {message: mesg, msg, code} = result;
      if (!success_code.includes(code)) {
        throw {message: msg || mesg};
      }
      return {result, fileInfo};
    })
    .catch(error => {
      msgAlert.error(error.message);
      throw error;
    });
};

export const fetchApi = fetcher(handler);

const dlFile = fetcher(dlHandler);

const getToken = () => ({Authorization: `yiru ${storage.get('token') || ''}`});

const fetch = ({method, url, prefix, headers, ...opt}) => fetchApi(method)(`${prefix ?? TARGET}${url}`, {headers: {...getToken(), ...headers}, credentials: 'omit', ...opt});

export const suspense = ({method, url, prefix, headers, ...opt}) => wrapPromise(fetchApi(method)(`${prefix ?? TARGET}${url}`, {headers: {...getToken(), ...headers}, ...opt}));

export const dlApi = ({method, url, prefix, ...opt}) => dlFile(method)(`${prefix ?? TARGET}${url}`, {headers: getToken(), ...opt});

export const fetchStream = ({method, url, prefix, headers, ...opt}) => fetcher(handleStream)(method)(`${prefix ?? TARGET}${url}`, {headers: {...getToken(), ...headers}, ...opt});

export const testFetcher = ({method, url, prefix, ...opt}) => fetcher()(method)(`${prefix ?? TARGET}${url}`, {headers: getToken(), credentials: 'omit', ...opt});

export default fetch;
