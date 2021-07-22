import {message} from 'antd';
import {utils} from '@common';
const {fetcher,storage,wrapPromise}=utils;

const {TARGET}=require('@configs');

import {logout} from '@app/utils/utils';

const success_code=[200];

const handler=response=>{
  /* if(response.status===401){
    message.error(response.statusText);
    logout(true);
    return;
  }
  if(!success_code.includes(response.status)){
    message.error(response.statusText);
    throw response.statusText;
  } */
  return response.json().then(result=>{
    result.code=result.code??response.status;
    result.msg=result.message??result.msg??response.statusText;
    const {msg,code}=result;
    if(code===401){
      message.error(msg);
      logout(true);
      throw {code,message:msg};
    }
    if(!success_code.includes(code)){
      throw {code,message:msg};
    }
    return result;
  }).catch(error=>{
    message.error(error.message);
    throw error.message;
  });
};

const dlHandler=response=>{
  if(response.status!==200){
    message.error(response.statusText);
    throw {message:response.statusText};
  }
  const disposition=response.headers.get('Content-Disposition');
  // const filename=decodeURIComponent(disposition.split(';')[1].split('=')[1]);
  const fileInfo=decodeURIComponent(disposition);
  return response.blob().then(result=>{
    result.code=result.code??response.status;
    const {message:mesg,msg,code}=result;
    if(!success_code.includes(code)){
      throw {message:msg||mesg};
    }
    return {result,fileInfo};
  }).catch(error=>{
    message.error(error.message);
    throw error;
  });
};

const fetchApi=fetcher(handler);

const dlFile=fetcher(dlHandler);

const getToken=()=>({'Authorization':`yiru ${storage.get('token')||''}`});

const fetch=({method,url,...opt})=>fetchApi(method)(`${TARGET}${url}`,{...opt,headers:getToken(),credentials:'omit'});

export const suspense=({method,url,...opt})=>wrapPromise(fetchApi(method)(`${TARGET}${url}`,{...opt,headers:getToken()}));

export const dlApi=({method,url,...opt})=>dlFile(method)(`${TARGET}${url}`,{...opt,headers:getToken()});

export const testFetcher=({method,url,...opt})=>fetcher()(method)(`${TARGET}${url}`,{...opt,headers:getToken(),credentials:'omit'});

export default fetch;



